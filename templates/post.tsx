// Dependencies
import * as React from "react";
import clsx from "clsx";
import { proxy } from "@flyyer/proxy";
import { Variable as V, Validator } from "@flyyer/variables";
import type { TemplateProps } from "@flyyer/types";
import type { Static } from "@flyyer/variables";

// Internals
import { Layer } from "../components";
import alternative from "../static/alternative.jpeg";
import background from "../static/background.jpeg";
import me from "../static/me.jpeg";
import "../styles/tailwind.css";

type Variables = Static<typeof schema>;
type Locale = "en" | "es";

/**
 * Export to enable variables UI on Flayyer.com
 */
export const schema = V.Object({
  content: V.String({
    default:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam phasellus vestibulum lorem sed. Scelerisque fermentum dui faucibus in ornare quam viverra. Consectetur libero id faucibus nisl tincidunt eget nullam non nisi. Ornare arcu dui vivamus arcu felis bibendum ut tristique. Dui nunc mattis enim ut tellus. Est pellentesque elit ullamcorper dignissim cras. Consequat semper viverra nam libero. Velit euismod in pellentesque massa.",
    description: "The content of the post",
    title: "Post content",
  }),
  date: V.DateTime({
    default: "2005-12-24T04:00:00.000Z",
    description: "The date of the post",
    examples: [new Date().toISOString()],
    title: "Post date",
  }),
  image: V.Image({
    default: background,
    description: "The image to use for the post",
    examples: [alternative],
    title: "Post image",
  }),
  locale: V.Optional(
    V.String({
      default: "en",
      description: "The locale of the post",
      examples: ["en", "es"],
      title: "Post locale",
    })
  ),
  title: V.String({
    default: "Created with React.js, TailwindCSS & Flayyer",
    description: "The title of the post",
    examples: ["Created with React.js, TailwindCSS & Flayyer"],
    title: "Post title",
  }),
  views: V.String({
    default: "300",
    description: "The number of views for the post",
    examples: ["300", "100"],
    title: "Post views",
  }),
});

const validator = new Validator(schema);
const translations = {
  en: {
    published: "Published",
    share: "Share this post",
    views: "views",
  },
  es: {
    published: "Publicado",
    share: "Comparte este post",
    views: "vistas",
  },
};

export default function PostTemplate(props: TemplateProps<Variables>) {
  const { agent, variables } = props;

  if (!validator.validate(variables)) {
    // Fallback for invalid variables
    return null;
  }

  const { content, date, image, title, views } = variables;
  const locale = (variables.locale as Locale) || "en";

  const formatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Layer
      className={clsx(
        "flex items-center px-2 overflow-hidden bg-white",
        !locale && views && "flyyer-wait"
      )}
    >
      <div className="container max-w-[1172.4px] mx-auto z-10">
        <div className="grid items-center grid-cols-12 gap-y-[24px] md:gap-[48px]">
          <div className="col-span-12 md:col-span-7 story:!col-span-12">
            <div className="overflow-hidden shadow-md rounded-[19.2px] story:!rounded-[38.4px]">
              <img
                alt={title}
                className="w-full"
                loading="eager"
                src={proxy(image)}
              />
            </div>

            <div className="relative flex items-end px-[28.8px] space-x-[19.2px] thumb:mt-[-32px] banner:mt-[-48px] story:!px-[57.6px] story:!mt-[-96px] story:!space-x-[38.4px]">
              <div className="overflow-hidden rounded-full drop-shadow-lg thumb:w-[64px] thumb:h-[64px] banner:w-[96px] banner:h-[96px] story:!w-[192px] story:!h-[192px]">
                <img
                  alt="Daniel Esteves"
                  className="w-full"
                  loading="eager"
                  src={proxy(me)}
                />
              </div>
              <span className="font-bold text-black rounded-full bg-primary thumb:px-[10px] thumb:py-[5px] thumb:text-[12px] banner:px-[14.4px] banner:py-[9.6px] banner:text-[14.4px] story:!px-[28.8px] story:!py-[19.2px] story:!text-[28.8px]">
                {views} {translations[locale].views}
              </span>
              <div className="absolute flex justify-end flex-1 right-[28.8px] thumb:bottom-[16px] banner:bottom-[28.8px] story:!right-[57.6px] story:!bottom-[57.6px]">
                <button
                  className="z-10 flex items-center px-[14.4px] py-[9.6px] text-[14.4px] font-bold text-black rounded-full bg-primary story:px-[28.8px] story:py-[19.2px] story:text-[28.8px]"
                  type="button"
                >
                  <span className="sr-only sm:not-sr-only">
                    {translations[locale].share}
                  </span>
                  <svg
                    fill="currentColor"
                    height="1em"
                    viewBox="0 0 20 20"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-[19.2px] h-[19.2px] sm:ml-[9.6px] sm:mr-[-4.8px] story:!w-[38.4px] story:!h-[38.4px] story:!ml-[19.2px] story:!mr-[-9.6px]"
                  >
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-12 thumb:space-y-[16px] banner:space-y-[19.2px] story:!col-span-12 story:!space-y-[38.4px] md:col-span-5">
            <h1 className="font-bold text-[#071D49] thumb:text-[18px] banner:text-[28.8px] story:!text-[57.6px]">
              {title}
            </h1>
            <p className="font-bold text-primary thumb:text-[12px] banner:text-[14.4px] story:!text-[28.8px]">
              {translations[locale].published}{" "}
              <time dateTime={date}>{formatter.format(new Date(date))}</time>
            </p>
            <p className="font-bold text-[#838383] whitespace-pre-line thumb:hidden banner:block banner:text-[14.4px] story:!text-[28.8px]">
              {content}
            </p>
          </div>
        </div>
      </div>
    </Layer>
  );
}
