import { Link, Meta, Title } from "@solidjs/meta";

type Props = {
  title: string;
  description: string;
  path: string;
  image?: string;
  article?: boolean;
  markdown?: string;
};

export default function PageMeta(props: Props) {
  const url = () => `https://www.filipiversen.com${props.path}`;
  const image = () => `https://www.filipiversen.com${props.image ?? "/og/portfolio.png"}`;
  return (
    <>
      <Title>{props.title}</Title>
      <Meta name="description" content={props.description} />
      <Link rel="canonical" href={url()} />
      <Link rel="describedby" href="/llms.txt" />
      {props.markdown && <Link rel="alternate" type="text/markdown" href={props.markdown} />}
      <Meta property="og:type" content={props.article ? "article" : "website"} />
      <Meta property="og:site_name" content="Filip Iversen" />
      <Meta property="og:title" content={props.title} />
      <Meta property="og:description" content={props.description} />
      <Meta property="og:url" content={url()} />
      <Meta property="og:image" content={image()} />
      <Meta property="og:image:width" content="1200" />
      <Meta property="og:image:height" content="630" />
      <Meta property="og:image:alt" content={props.title} />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={props.title} />
      <Meta name="twitter:description" content={props.description} />
      <Meta name="twitter:image" content={image()} />
    </>
  );
}
