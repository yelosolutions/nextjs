import { getStaticProps } from "..";
import Layout from "../../components/layout";
import { getAllPostIds } from "../../lib/posts";
import { getPostData } from '../lib/posts';

export async function getStaticPaths() {
    //array of known paths
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
};


//pre-render pursed data
export async function getStaticProps({ params }) {
    const blogContent = getPostData(params.id);
    return {
        props: {blogContent}
    };
};

export default function Post({blogContent}) {
    const {id, title, date} = blogContent;
    return <Layout>
        {title}
        <br />
        {id}
        <br />
        {date}
    </Layout>
};

