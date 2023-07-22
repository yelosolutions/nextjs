import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

//TypeScript types
import { GetStaticPaths, GetStaticProps } from "next";

//returns an array of possible values for id
export const getStaticPaths: GetStaticPaths = async () => {
  //array of known paths
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

//pre-render pursed data for post with 'id'
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: { postData },
  };
};

//component to render this page
export default function Post({
  postData
}: {
  postData: {
    title: string
    date: string
    contentHtml: string
  };
}) {
  const { title, date } = postData;
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}> {title} </h1>
        <div className={utilStyles.lightText}>
          <Date dateString={date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
