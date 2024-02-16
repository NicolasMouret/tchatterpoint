import Link from "next/link";

const BASE_URL = process.env.NEXTAUTH_URL;
if (!BASE_URL) {
  throw new Error(
    "NEXTAUTH_URL must be defined in .env.local or environment"
  );
}

export default function LegalsPage() {

  const styles = {
    title: "font-bold text-2xl my-6 text-center",
    link: "text-yellow-400 font-semibold hover:underline hover:text-yellow-500",
    part: "flex flex-col gap-3"
  }

    return (
      <section className="w-[95%] lg:w-full px-8 py-4 border-1 border-slate-500 bg-slate-950 
      bg-opacity-60 backdrop-blur-sm rounded">
        <h2 className={`${styles.title}`}>1 - &Eacute;dition du site</h2>
          <p className="">
            En vertu de l&apos;article 6 de la loi n&deg; 2004-575 du 21 juin 2004 
            pour la confiance dans l&apos;&eacute;conomie num&eacute;rique,
            il est pr&eacute;cis&eacute; aux utilisateurs du site internet <Link className={`${styles.link}`} href={BASE_URL!}>{BASE_URL}</Link> l&apos;identit&eacute; 
            des diff&eacute;rents intervenants dans le cadre de sa r&eacute;alisation et de son suivi:
          </p>
          <div className="flex flex-col gap-2 mt-2">
            <p><strong>Propri&eacute;taire du site :</strong> Mouret Nicolas</p>
            <p><strong>Contact :</strong> contact@tchatterpoint.fr - Adresse : 28 rue Morel Ladeuil Clermont-ferrand 63000.</p> 
            <p><strong>Adresse postale :</strong> 28 rue Morel Ladeuil Clermont-ferrand 63000.</p>          
            <p><strong>Directeur de la publication :</strong> Mouret Nicolas - Contact : contact@tchatterpoint.fr.</p>
            <p><strong>H&eacute;bergeur :</strong> Vercel Inc. 440 N Barranca Ave #4133 Covina, CA 91723 privacy@vercel.com</p>
            <p><strong>D&eacute;l&eacute;gu&eacute; &agrave; la protection des donn&eacute;es :</strong> Mouret Nicolas - contact@tchatterpoint.fr</p>
          </div>
        <h2 className={`${styles.title}`}>2 - Propri&eacute;t&eacute; intellectuelle et contrefa&ccedil;ons.</h2>
          <p>
            Mouret Nicolas est propri&eacute;taire des droits de propri&eacute;t&eacute; intellectuelle et d&eacute;tient
            les droits d&rsquo;usage sur tous les &eacute;l&eacute;ments accessibles sur le site internet, 
            notamment les textes, images, graphismes, logos, vid&eacute;os, architecture, ic&ocirc;nes et sons.
            Toute reproduction, repr&eacute;sentation, modification, publication, adaptation de tout ou partie des &eacute;l&eacute;ments du site, 
            quel que soit le moyen ou le proc&eacute;d&eacute; utilis&eacute;, est interdite, 
            sauf autorisation &eacute;crite pr&eacute;alable de Mouret Nicolas.
            Toute exploitation non autoris&eacute;e du site ou de l&rsquo;un quelconque des &eacute;l&eacute;ments qu&rsquo;il contient sera 
            consid&eacute;r&eacute;e comme constitutive d&rsquo;une contrefa&ccedil;on et poursuivie conform&eacute;ment
            aux dispositions des articles L.335-2 et suivants du Code de Propri&eacute;t&eacute; Intellectuelle.
          </p>
        <h2 className={`${styles.title}`}>3 - Limitations de responsabilit&eacute;.</h2>
          <div className={`${styles.part}`}>
            <p>
            Mouret Nicolas ne pourra &ecirc;tre tenu pour responsable des dommages directs et indirects caus&eacute;s au 
            mat&eacute;riel de l&rsquo;utilisateur, lors de l&rsquo;acc&egrave;s au site <Link className={`${styles.link}`} href={BASE_URL!}>{BASE_URL}</Link>.
            Mouret Nicolas d&eacute;cline toute responsabilit&eacute; quant &agrave; l&rsquo;utilisation qui pourrait &ecirc;tre 
            faite des informations et contenus pr&eacute;sents sur <Link className={`${styles.link}`} href={BASE_URL!}>{BASE_URL}</Link>.
            </p>
            <p>
            Mouret Nicolas s&rsquo;engage &agrave; s&eacute;curiser au mieux le site <Link className={`${styles.link}`} href={BASE_URL!}>{BASE_URL}</Link>, 
            cependant sa responsabilit&eacute; ne pourra &ecirc;tre mise en cause si des donn&eacute;es 
            ind&eacute;sirables sont import&eacute;es et install&eacute;es sur son site &agrave; son insu.
            </p>
            <p>
            Des espaces interactifs (espace contact ou commentaires) sont &agrave; la disposition des utilisateurs. 
            Mouret Nicolas se r&eacute;serve le droit de supprimer, sans mise en demeure pr&eacute;alable, tout contenu d&eacute;pos&eacute; 
            dans cet espace qui contreviendrait &agrave; la l&eacute;gislation applicable en France, 
            en particulier aux dispositions relatives &agrave; la protection des donn&eacute;es.
            </p>
            <p>
            Le cas &eacute;ch&eacute;ant, Mouret Nicolas se r&eacute;serve &eacute;galement la possibilit&eacute; de mettre 
            en cause la responsabilit&eacute; civile et/ou p&eacute;nale de l&rsquo;utilisateur, notamment en cas de message &agrave; 
            caract&egrave;re raciste, injurieux, diffamant, ou pornographique, quel que soit le support utilis&eacute; (texte, photographie...).
            </p>
          </div>
        <h2 className={`${styles.title}`}>4 - CNIL et gestion des données personnelles.</h2>
          <div className={`${styles.part}`}>
            <p>
            Conform&eacute;ment aux dispositions de la loi 78-17 du 6 janvier 1978 modifi&eacute;e, 
            l&rsquo;utilisateur du site <Link className={`${styles.link}`} href={BASE_URL!}>{BASE_URL}</Link> dispose d&rsquo;un droit d&rsquo;acc&egrave;s, 
            de modification et de suppression des informations collect&eacute;es. Pour exercer ce droit, 
            envoyez un message &agrave; notre D&eacute;l&eacute;gu&eacute; &agrave; 
            la Protection des Donn&eacute;es : Mouret Nicolas - contact@tchatterpoint.fr.
            </p>
            <p>
            Pour plus d&apos;informations sur la fa&ccedil;on dont nous traitons vos donn&eacute;es 
            (type de donn&eacute;es, finalit&eacute;, destinataire...), 
            lisez notre <Link className={`${styles.link}`} href={`${BASE_URL!}/politique-confidentialite`}>politique de confidentialité</Link>.
            </p> 
          </div>
        <h2 className={`${styles.title}`}>5 - Liens hypertextes et cookies</h2>
          <div className={`${styles.part}`}>
            <p>
            Le site <Link className={`${styles.link}`} href={BASE_URL!}>{BASE_URL}</Link> d&eacute;gage toute responsabilit&eacute; &agrave; propos 
            des liens cr&eacute;&eacute;s par d&rsquo;autres sites vers <Link className={`${styles.link}`} href={BASE_URL!}>{BASE_URL}</Link>.
            </p>
            <p>
            La navigation sur le site <Link className={`${styles.link}`} href={BASE_URL!}>{BASE_URL}</Link> est susceptible de provoquer 
            l&rsquo;installation de cookie(s) sur l&rsquo;ordinateur de l&rsquo;utilisateur.
            Un &quot;cookie&quot; est un fichier de petite taille qui enregistre des informations 
            relatives &agrave; la navigation d&rsquo;un utilisateur sur un site. Les donn&eacute;es 
            ainsi obtenues permettent d&apos;obtenir des mesures de fr&eacute;quentation, par exemple.
            </p>
            <p>
            Vous avez la possibilit&eacute; d&rsquo;accepter ou de refuser les cookies en modifiant 
            les param&egrave;tres de votre navigateur. Aucun cookie ne sera d&eacute;pos&eacute; sans votre consentement.
            Les cookies sont enregistr&eacute;s pour une dur&eacute;e maximale de 13 mois.
            Pour plus d&apos;informations sur la fa&ccedil;on dont nous faisons usage des cookies, 
            lisez notre <Link className={`${styles.link}`} href={`${BASE_URL!}/politique-confidentialite`}>politique de confidentialité</Link>.
            </p>
          </div> 
        <h2 className={`${styles.title}`}>6 - Droit applicable et attribution de juridiction.</h2>
          <p>
            Tout litige en relation avec l&rsquo;utilisation du site <Link className={`${styles.link}`} href={BASE_URL!}>{BASE_URL} </Link> 
            est soumis au droit fran&ccedil;ais. En dehors des cas o&ugrave; la loi ne le permet pas, 
            il est fait attribution exclusive de juridiction aux tribunaux comp&eacute;tents de Clermont-ferrand.
          </p>
      </section>
    )
}