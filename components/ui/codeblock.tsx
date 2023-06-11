'use client'

import { FC, memo } from 'react'
import { Check, Clipboard, Download } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-cliipboard'

interface Props {
  language: string
  value: string
}

interface languageMap {
  [key: string]: string | undefined
}

export const programmingLanguages: languageMap = {
  javascript: '.js',
  python: '.py',
  java: '.java',
  c: '.c',
  cpp: '.cpp',
  'c++': '.cpp',
  'c#': '.cs',
  ruby: '.rb',
  php: '.php',
  swift: '.swift',
  'objective-c': '.m',
  kotlin: '.kt',
  typescript: '.ts',
  go: '.go',
  perl: '.pl',
  rust: '.rs',
  scala: '.scala',
  haskell: '.hs',
  lua: '.lua',
  shell: '.sh',
  sql: '.sql',
  html: '.html',
  css: '.css'
  // add more file extensions here, make sure the key is same as language prop in CodeBlock.tsx component
}

export const generateRandomString = (length: number, lowercase = false) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXY3456789' // excluding similar looking characters like Z, 2, I, 1, O, 0
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return lowercase ? result.toLowerCase() : result
}
const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })
  const downloadAsFile = () => {
    if (typeof window === 'undefined') {
      return
    }
    const fileExtension = programmingLanguages[language] || '.file'
    const suggestedFileName = `file-${generateRandomString(
      3,
      true
    )}${fileExtension}`
    const fileName = window.prompt('Enter file name' || '', suggestedFileName)

    if (!fileName) {
      // user pressed cancel on prompt
      return
    }

    const blob = new Blob([value], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = fileName
    link.href = url
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
  return (
    <div className="codeblock relative w-full font-sans text-[16px]">
      <div className="flex w-full items-center justify-between px-4 py-1.5">
        <span className="text-xs lowercase text-white">{language}</span>

        <div className="flex items-center">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded bg-none p-1 text-xs text-white"
            onClick={() => copyToClipboard(value)}
          >
            {isCopied ? <Check size={18} /> : <Clipboard size={18} />}
            {isCopied ? 'Copied!' : 'Copy code'}
          </button>
          <button
            type="button"
            className="flex items-center rounded bg-none p-1 text-xs text-white"
            onClick={downloadAsFile}
          >
            <Download size={18} />
          </button>
        </div>
      </div>

      <SyntaxHighlighter
        language={language}
        style={coldarkDark}
        customStyle={{
          margin: 0,
          width: '100%',
          background: 'transparent'
        }}
        codeTagProps={{
          style: {
            fontSize: '0.9rem',
            fontFamily: 'var(--font-mono)'
          }
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  )
})
CodeBlock.displayName = 'CodeBlock'

export { CodeBlock }
