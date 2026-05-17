type BlogSectionProps = {
  title: string;
  description: string;
}
export const BlogSection = ({ title, description }: BlogSectionProps) => {
  return (
    <div>
      <p className="text-lg font-semibold text-zinc-950">{title}</p>
      <p className="text-sm text-zinc-600">{description}</p>
    </div>
  )

}