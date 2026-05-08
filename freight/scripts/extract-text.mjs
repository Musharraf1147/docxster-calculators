import fs from 'node:fs'
import path from 'node:path'

const PROJECT_ROOT = path.resolve(process.cwd())

const SOURCE_GLOBS = [
  { dir: 'src', exts: new Set(['.js', '.jsx', '.ts', '.tsx']) },
  { dir: '.', exts: new Set(['.html']) },
]

function walk(dirPath) {
  const out = []
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
  for (const ent of entries) {
    const full = path.join(dirPath, ent.name)
    if (ent.isDirectory()) {
      // Skip common bulky/irrelevant dirs
      if (ent.name === 'node_modules' || ent.name === 'dist' || ent.name === '.git') continue
      out.push(...walk(full))
    } else if (ent.isFile()) {
      out.push(full)
    }
  }
  return out
}

function isTargetFile(absPath) {
  const rel = path.relative(PROJECT_ROOT, absPath)
  for (const g of SOURCE_GLOBS) {
    const base = path.resolve(PROJECT_ROOT, g.dir)
    if (!absPath.startsWith(base + path.sep) && absPath !== base) continue
    const ext = path.extname(absPath)
    if (g.exts.has(ext)) return true
  }
  // explicitly include top-level index.html
  if (rel === 'index.html') return true
  return false
}

function stripJsComments(src) {
  // Best-effort removal to reduce noise for string-literal extraction.
  // Not a full parser; good enough for this project.
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1')
}

function cleanText(s) {
  return s
    .replace(/\s+/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
}

function extractFromHtml(src) {
  const texts = []
  // naive text between tags
  const re = />\s*([^<>{}][^<]*?)\s*</g
  let m
  while ((m = re.exec(src))) {
    const t = cleanText(m[1])
    if (t) texts.push(t)
  }
  return texts
}

function extractFromJsx(src) {
  const texts = []
  const code = stripJsComments(src)

  // Extract plain JSX text nodes: > some text <
  // Excludes {expressions} and nested tags.
  const jsxTextRe = />\s*([^<>{}][^<]*?)\s*</g
  let m
  while ((m = jsxTextRe.exec(code))) {
    const t = cleanText(m[1])
    if (t) texts.push(t)
  }

  // Extract string literals: "..." and '...'
  // Excludes extremely short/likely-non-UI items by filtering later.
  const strRe = /(["'])(?:(?!\1|\\).|\\.)*\1/g
  const candidates = code.match(strRe) ?? []
  for (const raw of candidates) {
    const unquoted = raw.slice(1, -1)
    const t = cleanText(unquoted)
    if (t) texts.push(t)
  }

  return texts
}

function looksUserFacing(t) {
  // Filter out obvious non-UI noise (class names, paths, hex colors, units-only).
  if (!t) return false
  if (t.startsWith('bg-') || t.startsWith('text-') || t.startsWith('border-')) return false
  if (t.includes('://')) return false
  if (t.startsWith('/') || t.includes('/src/') || t.includes('/Users/')) return false
  if (/^[0-9.]+$/.test(t)) return false
  if (/^#[0-9a-fA-F]{3,8}$/.test(t)) return false
  if (/^[a-z0-9_-]+$/i.test(t) && t.length <= 2) return false
  return true
}

const allFiles = walk(PROJECT_ROOT).filter(isTargetFile)
const found = new Set()

for (const f of allFiles) {
  const ext = path.extname(f)
  const src = fs.readFileSync(f, 'utf8')
  const parts =
    ext === '.html'
      ? extractFromHtml(src)
      : extractFromJsx(src)

  for (const p of parts) {
    if (looksUserFacing(p)) found.add(p)
  }
}

const list = Array.from(found).sort((a, b) => a.localeCompare(b))
process.stdout.write(list.join('\n') + '\n')

