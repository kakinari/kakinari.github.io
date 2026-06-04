type Props = {
  categories: string[];
};

function categoryToAnchor(category: string) {
  return `category-${category.toLowerCase().replace(/\s+/g, "-")}`;
}

function filterClassName() {
  return [
    "inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition",
    "border-slate-300 text-slate-700 hover:border-slate-500 hover:text-slate-900",
  ].join(" ");
}

export function CategoryFilter({ categories }: Props) {
  return (
    <nav className="mb-10 flex flex-wrap gap-3" aria-label="カテゴリ一覧">
      {categories.map((category) => (
        <a
          key={category}
          href={`#${categoryToAnchor(category)}`}
          className={filterClassName()}
        >
          {category}
        </a>
      ))}
    </nav>
  );
}
