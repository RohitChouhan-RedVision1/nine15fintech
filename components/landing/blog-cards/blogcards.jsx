import Link from 'next/link'
import styles from './blogcards.module.css'
import formatDate from '@/lib/formatDate'

const BlogCards = ({ item }) => {
    return (
        <div className="p-1">
            <div className={styles.postItem}>
                <div className={styles.postFeaturedImage}>
                    <Link href={`blogs/${item.slug}`}>
                        <figure class="image-anime">
                            <img src={item?.image?.url} alt="" />
                        </figure>
                    </Link>
                </div>
                <div className={styles.postItemBody}>
                    <div className={styles.postItemMeta}>
                        <ul>
                            <li><i class="fa-solid fa-calendar-days"></i>{formatDate(item?.createdAt)}</li>
                        </ul>
                    </div>
                    <div className={styles.postItemContent}>
                        <h2><Link href={`blogs/${item?.slug}`}>{item?.posttitle}</Link></h2>
                    </div>
                    <div>
                        <Link href={`blogs/${item?.slug}`} className={styles.readmoreBtn}>read more</Link>
                    </div>
                </div>
            </div>
            {/* <Link href={`blogs/${item.slug}`}>
                <div className="max-w-sm max-h-96 min-h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link href={`blogs/${item.slug}`}>
                        <img className="rounded-t-lg" src={item?.image?.url} alt={item?.image?.url} />
                    </Link>
                    <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.posttitle}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.posttitle}</p>
                    </div>
                </div>
            </Link> */}
        </div>
    )
}

export default BlogCards