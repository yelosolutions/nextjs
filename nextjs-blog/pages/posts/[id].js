import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

//returns an array of possible values for id
export async function getStaticPaths() {
    //array of known paths
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
};


//pre-render pursed data for post with 'id'
export async function getStaticProps({ params }) {
    const blogContent = await getPostData(params.id);
    return {
        props: {blogContent}
    };
};

//component to render this page
export default function Post({blogContent}) {
    const {id, title, date} = blogContent;
    return <Layout>
        {title}
        <br />
        {id}
        <br />
        {date}
        <br />
        <div dangerouslySetInnerHTML={{__html: blogContent.contentHTML}}/>
        
    </Layout>
};

