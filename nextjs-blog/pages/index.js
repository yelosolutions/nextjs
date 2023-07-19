import Head from 'next/head';
import Layout, {siteTitle} from '../components/layout';
import styles from '../styles/Home.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { getSortedPosts } from '../lib/posts';


//Fetch the parsed data
export async function  getStaticProps (){
  const allPostsData = getSortedPosts();
  return {props: {allPostsData,},};
};

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[I am a web developer]</p>
        <p>
          (This is a sample website - I’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  )
}
