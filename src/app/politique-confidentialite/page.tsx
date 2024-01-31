export default function PrivacyPolicyPage() {
  const styles = {
    title: "font-bold text-xl my-4 text-center",
    link: "text-yellow-400 font-semibold hover:underline hover:text-yellow-500",
    part: "flex flex-col gap-2",
    listItem: "list-disc font-semibold my-2 list-inside"
  }
  return (
    <section className="w-[95%] lg:w-full px-8 py-4 border-1 border-slate-500 bg-slate-950 
    bg-opacity-60 backdrop-blur-sm rounded">
      <h1 className="font-bold text-xl my-4 text-center">Politique de confidentialité</h1>
      <h2 className={`${styles.title}`}>Introduction</h2>
      <div className={`${styles.part}`}>
        <p>
        Devant le développement des nouveaux outils de communication, 
        il est nécessaire de porter une attention particulière à la protection de la vie privée.
        </p> 
        <p>
        C’est pourquoi, nous nous engageons à respecter la confidentialité des renseignements
         personnels que nous collectons.
        </p>
      </div>
      <h2 className={`${styles.title}`}>Collecte des renseignements personnels</h2>
      <div>
        <ul>
          <li className={`${styles.listItem}`}>Prénom</li>
          <li className={`${styles.listItem}`}>Adresse électronique</li>
        </ul>
      </div>
      <div className={`${styles.part}`}>
        <p>
        Les renseignements personnels que nous collectons sont recueillis au travers 
        de formulaires et grâce à l’interactivité établie entre vous et notre site Web. 
        </p>
        <p>
        Nous utilisons également, comme indiqué dans la section suivante, 
        des fichiers témoins et/ou journaux pour réunir des informations vous concernant.
        </p>
      </div>
      <h2 className={`${styles.title}`}>Formulaires&nbsp;et interactivité</h2>
      <div className="font-medium">
        Vos renseignements personnels sont collectés par le biais de formulaire, 
        à savoir:
      </div>
      <div>
        <ul>
          <li className={`${styles.listItem}`}>Formulaire d&apos;inscription au site Web</li>
        </ul>
      </div>
      <div className="font-medium">
        Nous utilisons les renseignements ainsi collectés pour les finalités suivantes :</div>
      <div>
        <ul>
          <li className={`${styles.listItem}`}>Contact</li>
        </ul>
      </div>
      <h2 className={`${styles.title}`}>Droit d’opposition et de retrait</h2>
      <div className={`${styles.part}`}>
        <p>
          Nous nous engageons à vous offrir un droit d’opposition et de retrait quant
          à vos renseignements personnels.
        </p>
        <p>Le droit d’opposition s’entend comme étant la possiblité offerte aux 
          internautes de refuser que leurs renseignements personnels soient utilisées 
          à certaines fins mentionnées lors de la collecte.
        </p>
        <p>Le droit de retrait s’entend comme étant la possiblité offerte aux internautes
          de demander à ce que leurs renseignements personnels ne figurent plus, 
          par exemple, dans une liste de diffusion.
        </p>
        <p className="font-medium">Pour pouvoir exercer ces droits, vous pouvez contacter:</p>
      </div>
      <div className={`${styles.listItem}`}>Courriel - contact@tchatterpoint.fr</div>
      <h2 className={`${styles.title}`}>Droit d’accès</h2>
      <div>
        Nous nous engageons à reconnaître un droit d’accès et de rectification
         aux personnes concernées désireuses de consulter, modifier, 
         voire radier les informations les concernant.
      </div>
      <div className="font-medium mt-2">L’exercice de ce droit se fera:</div>
      <div className={`${styles.listItem}`}>Courriel - contact@tchatterpoint.fr</div>
      <h2 className={`${styles.title}`}>Sécurité</h2>
      <div className={`${styles.part}`}>
        <p>
          Les renseignements personnels que nous collectons sont conservés 
          dans un environnement sécurisé. Les personnes travaillant pour nous 
          sont tenues de respecter la confidentialité de vos informations.
        </p>
        <p>
          Pour assurer la sécurité de vos renseignements personnels, 
          nous avons recours aux mesures suivantes :
        </p>
      <p>
        <ul>
          <li className={`${styles.listItem}`}>Protocole SSL</li>
          <li className={`${styles.listItem}`}>Identifiant / mot de passe</li>
        </ul>
      </p>
      <p>
        Nous nous engageons à maintenir un haut degré de confidentialité
         en intégrant les dernières innovations technologiques permettant
          d’assurer la confidentialité de vos transactions.
      </p>
      <p>
          Toutefois, comme aucun mécanisme n’offre une sécurité maximale, 
          une part de risque est toujours présente lorsque l’on utilise Internet 
          pour transmettre des renseignements personnels.
      </p>
      </div>
      <h2 className={`${styles.title}`}>Législation</h2>
      <div>
        Nous nous engageons à respecter les dispositions législatives énoncées dans:
      </div>
      <a
        className={`${styles.link}`} 
        href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees">
      https://www.cnil.fr/fr/reglement-europeen-protection-donnees
      </a>
      
    </section>
  )
}