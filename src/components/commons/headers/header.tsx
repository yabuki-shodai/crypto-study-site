type HeaderProps = {
  title: string;
  description: string;
}

export const Header = ({ title, description }: HeaderProps) => {
  return (
    <header className="flex flex-col gap-4 border-b border-zinc-300 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-zinc-950 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          {description}
        </p>
      </div>
    </header>
  )
}