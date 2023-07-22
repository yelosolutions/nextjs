import Head from 'next/head';
import Layout, {siteTitle} from '../components/layout';
import styles from '../styles/Home.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { getSortedPosts } from '../lib/posts';
import Date from '../components/date';



//Fetch the parsed data
export async function  getStaticProps() {
  const allPostsData = getSortedPosts();
  return {props: {allPostsData}};
};

export default function Home({ 
  allPostsData }: {
    allPostsData: {
    date: string
    title: string
    id: string
  }[]
  }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I am a Web Developer and Data enthusiast from Ke</p>
        
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({id, title, date}) => (
            <li key={id} className={utilStyles.listItem}>
              <Link
              href={`/posts/${id}`}
              >
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date}/>
              </small>
            </li>
          ))}
        </ul>

      </section>
    </Layout>
  )
}
