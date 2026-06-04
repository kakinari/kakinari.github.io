import BlogHeader from "@/app/_components/blog-header";
type Props = {
  children?: React.ReactNode;
};

const BlogContainer = ({ children }: Props) => {
  return <div className="container mx-auto px-5"><BlogHeader />{children}</div>;
};

export default BlogContainer;
