import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "校门冰糖葫芦",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: <>还原童年校门口抽签赢糖葫芦的乐趣，重温那份期待与惊喜的小幸福！</>,
  },
  {
    title: "wechat 02",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        test <code>02</code>
      </>
    ),
  },
  {
    title: "wechat 03",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: <>test 03</>,
  },
  {
    title: "wechat 04",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: <>test 03</>,
  },
  {
    title: "wechat 05",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: <>test 03</>,
  },
  {
    title: "wechat 06",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: <>test 03</>,
  },
  {
    title: "wechat 07",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: <>test 03</>,
  },
  {
    title: "wechat 08",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: <>test 03</>,
  },
  {
    title: "wechat 09",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: <>test 03</>,
  },
  {
    title: "wechat 10",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: <>test 03</>,
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--3")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
