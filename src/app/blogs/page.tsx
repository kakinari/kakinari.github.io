import BlogContainer from "@/app/_components/blog-container";
import { CategoryFilter } from "@/app/_components/category-filter";
import { HeroPost } from "@/app/_components/hero-post";
import { BlogsIntro } from "@/app/_components/blogsIntro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts, getCategories, getPostsGroupedByCategory } from "@/lib/api";

function categoryToAnchor(category: string) {
  return `category-${category.toLowerCase().replace(/\s+/g, "-")}`;
}

export default function Blogs() {
  const allPosts = getAllPosts();
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  const categories = getCategories(morePosts);
  const categorizedPosts = getPostsGroupedByCategory(morePosts);

  return (
    <main>
      <BlogContainer>
        <BlogsIntro />
        {categories.length > 0 && <CategoryFilter categories={categories} />}
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        {categorizedPosts.map(({ category, posts }) => (
          <MoreStories
            key={category}
            posts={posts}
            title={`カテゴリ: ${category}`}
            sectionId={categoryToAnchor(category)}
          />
        ))}
      </BlogContainer>
    </main>
  );
}
