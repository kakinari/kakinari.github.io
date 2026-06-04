import { CMS_NAME } from "@/lib/constants";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
        カキナリホームページ
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        {" "}
        <a
          href="https://nextjs.org/"
          className="underline hover:text-blue-600 duration-200 transition-colors"
        >
          Next.js
        </a>{" "}
        と {CMS_NAME} を使用したブログに変更しました。
      </h4>
    </section>
  );
}
