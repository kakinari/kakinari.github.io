import { CategoryFilter } from "@/app/_components/category-filter";
import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts, getCategories, getPostsGroupedByCategory } from "@/lib/api";

function categoryToAnchor(category: string) {
  return `category-${category.toLowerCase().replace(/\s+/g, "-")}`;
}

export default function Index() {
  const allPosts = getAllPosts();
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  const categories = getCategories(morePosts);
  const categorizedPosts = getPostsGroupedByCategory(morePosts);

  return (
    <main>
      <Container>
        <Intro />
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
      </Container>
    </main>
  );
}
