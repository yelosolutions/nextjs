import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.css';

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
    const postData = await getPostData(params.id);
    return {
        props: {postData}
    };
};

//component to render this page
export default function Post({postData}) {
    const {id, title, date} = postData;
    return <Layout>
        <Head>
            <title>{title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}> {title} </h1>
            <div className={utilStyles.lightText}>
                <Date dateString={date}/>
            </div>
            <div dangerouslySetInnerHTML={{__html: postData.contentHTML}}/>
        </article>
    </Layout>
};

