import Link from "next/link";

const BlogHeader = () => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8 flex items-center">
      <Link href="/" className="hover:underline">
        カキナリホームページ
      </Link>
      .
    </h2>
  );
};

export default BlogHeader;
