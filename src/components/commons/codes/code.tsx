type CodeBlockProps = {
  language?: string;
  code: string;
};

export function CodeBlock({ language = "TypeScript", code }: CodeBlockProps) {
  const normalizedCode = code.trim();

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 bg-zinc-900 px-4 py-2">
        <span className="text-xs text-zinc-400">{language}</span>
      </div>

      <pre className="m-0 block overflow-x-auto bg-transparent p-0 text-left">
        <code className="block min-w-full whitespace-pre px-4 py-4 text-left font-mono text-sm leading-6 text-zinc-100">
          {normalizedCode}
        </code>
      </pre>
    </div>
  );
}