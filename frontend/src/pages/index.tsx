import Link from "next/link";
import styles from "./index.module.css";

const home = () => (
  <div className={styles.container}>
    <h1 className={styles.heading1}>🦸‍♂️ Welcome, Brave Soul, to the Most Legendary Superhero Catalogue in the Multiverse...</h1>
    <h2 className={styles.heading2}>But before you click that button, wait—just wait—for there is something you must know…</h2>

    <h3 className={styles.heading3}>🌟 Before You Leap Into the Catalogue Like a Capeless Rookie...</h3>
    <p className={styles.paragraph}>You're standing at the edge of greatness. Behind that button lies a treasure trove—no, a <strong>pantheon</strong>—of heroes, vigilantes, cosmic guardians, time-travelers, and possibly one raccoon with laser vision.</p>

    <h3 className={styles.heading3}>📜 The Ancient Origins of the Superhero Catalogue™️</h3>
    <p className={styles.paragraph}>Long ago, a sacred assembly of archivists and omniscient narrators convened to create the ultimate index of heroism. What they built was <strong>legendary</strong>.</p>

    <h3 className={styles.heading3}>⚠️ But Wait — Are You Truly Ready?</h3>
    <p className={styles.paragraph}>Inside you'll confront your deepest questions. Hero power rankings, elastic heroes with goggles, and why a toaster with a moral code exists.</p>

    <h3 className={styles.heading3}>💬 But Don't Just Take Our Word For It…</h3>
    <blockquote className={styles.quote}>"I clicked too soon. I wasn't ready. I'm still emotionally recovering." – Former User, probably</blockquote>
    <blockquote className={styles.quote}>"This catalogue changed my life. One of my personas is now legally recognized in New Jersey." – Real Human, definitely</blockquote>
    <blockquote className={styles.quote}>"Before this, I had never known the true meaning of power rankings." – Unnamed Celestial Being</blockquote>

    <h3 className={styles.heading3}>🤔 Still Thinking of Clicking That Button?</h3>
    <p className={styles.paragraph}>Good. You should be cautious. Here's what's waiting for you:</p>
    <ul className={styles.list}>
      <li className={styles.list_item}>Over <strong>10,000 meticulously indexed heroes</strong></li>
      <li className={styles.list_item}>Powers, weaknesses, cape fabric types</li>
      <li className={styles.list_item}>Fan rankings, alternate timelines, and hidden lore</li>
      <li className={styles.list_item}>Heroes who accidentally destroyed the moon 🌕</li>
    </ul>

    <h3 className={styles.heading3}>🧪 Just a Few More Things Before You Go...</h3>
    <ul className={styles.list}>
      <li  className={styles.list_item}>Do you know your power alignment?</li>
      <li className={styles.list_item}>Are you “Chaotic Good” or “Lawful Fabulous”?</li>
      <li className={styles.list_item}>Have you checked the multiverse threat level?</li>
      <li className={styles.list_item}>Did you bring snacks?</li>
    </ul>

    <div className={styles.warning}>🛑 FINAL WARNING: Behind that button is a place where time flows sideways, sidekicks become CEOs, and villains run excellent podcasts.</div>

    <div className={styles.button_container}>
      <Link href="/superheroes" className={styles.enter_button} >👉 ENTER THE CATALOGUE 👈</Link>
    </div>

  </div>
);

export default home;