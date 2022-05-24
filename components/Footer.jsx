import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
import Link from "next/link";

/**
 * Footer information Component. Called from <Layout>
 */
const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 Master Musician Store. All Rights Reserved ®</p>
        <div className='icons'>
          <Link href='https://instagram.com'>
            <a><AiFillInstagram /></a>
          </Link>
          <Link href='https://twitter.com'>
            <a><AiOutlineTwitter /></a>
          </Link>
        </div>
    </div>
  )
}

export default Footer