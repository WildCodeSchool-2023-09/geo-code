import { Helmet } from "react-helmet";
import Markdown from "react-markdown";

// Components
import PrimaryButton from "../components/buttons/PrimaryButton";
import SecondaryButton from "../components/buttons/SecondaryButton";

// SCSS Styles
import "../scss/home.scss";

// Data
import Statistics from "../data/Statistics.json";
import Partners from "../data/partners.json";

export default function Home() {
  return (
    <>
      <Helmet>
        <meta name="description" content="description text" />
        <meta name="robots" content="index, follow" />
        <meta
          name="googlebot"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta
          name="bingbot"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <link rel="canonical" href="https://portail.geocode.fr/" />
        <meta property="og:url" content="https://portail-geocode.fr/" />
        <meta property="og:site_name" content="Portail Geo Code" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Portail Geo Code | Accueil" />
        <meta property="og:description" content="description text" />
        <meta
          property="og:image"
          content="https://portail-geocode.fr/assets/webp/share-cover.webp"
        />
        <meta
          property="og:image:secure_url"
          content="https://portail-geocode.fr/assets/webp/share-cover.webp"
        />
        <meta property="og:image:width" content="584" />
        <meta property="og:image:height" content="384" />
        <meta property="fb:pages" content="" />
        <meta property="fb:admins" content="" />
        <meta property="fb:app_id" content="" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="" />
        <meta name="twitter:creator" content="" />
        <meta name="twitter:title" content="Portail Geo Code | Accueil" />
        <meta name="twitter:description" content="Portail Geo Code | Accueil" />
        <meta
          name="twitter:image"
          content="https://portail-geocode.fr/assets/webp/share-cover.webp"
        />

        <title>Portail Geo Code</title>
      </Helmet>
      <div className="header">
        <video
          className="background-video"
          autoPlay
          loop
          controls={false}
          playsInline
          muted
        >
          <source src="/assets/mp4/portail_geo_code-bg_video.mp4" />
        </video>
        <div className="section1">
          <p>Avec GéoCode</p>
          <h1 className="hometitle">
            Trouvez la borne de recharge <br />
            proche de chez vous
          </h1>
          <div className="btnsection">
            <SecondaryButton btnText="En savoir plus" btnLink="/#about" />
            <PrimaryButton btnText="Trouver une borne" btnLink="/map" />
          </div>
        </div>
      </div>
      <div className="content">
        <div className="about">
          <svg
            className="about_svg"
            viewBox="0 0 1664 170"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0L55.4667 2.62319C110.933 5.24638 221.867 10.4928 332.8 21.2478C443.733 31.8718 554.667 48.1355 665.6 56.792C776.533 65.5797 887.467 66.8913 998.4 58.6283C1109.33 50.2341 1220.27 32.3964 1331.2 31.0848C1442.13 29.7732 1553.07 44.9877 1608.53 52.7261L1664 60.3333V181H1608.53C1553.07 181 1442.13 181 1331.2 181C1220.27 181 1109.33 181 998.4 181C887.467 181 776.533 181 665.6 181C554.667 181 443.733 181 332.8 181C221.867 181 110.933 181 55.4667 181H0L0 0Z"
              fill="#19776d"
            />
            <path
              d="M0 0L55.4667 2.62319C110.933 5.24638 221.867 10.4928 332.8 21.2478C443.733 31.8718 554.667 48.1355 665.6 56.792C776.533 65.5797 887.467 66.8913 998.4 58.6283C1109.33 50.2341 1220.27 32.3964 1331.2 31.0848C1442.13 29.7732 1553.07 44.9877 1608.53 52.7261L1664 60.3333V181H1608.53C1553.07 181 1442.13 181 1331.2 181C1220.27 181 1109.33 181 998.4 181C887.467 181 776.533 181 665.6 181C554.667 181 443.733 181 332.8 181C221.867 181 110.933 181 55.4667 181H0L0 0Z"
              fill="#19776d"
            />
            <path
              d="M0 139.029L55.4667 134.045C110.933 128.93 221.867 118.962 332.8 114.109C443.733 109.256 554.667 109.78 665.6 106.501C776.533 103.222 887.467 96.1399 998.4 95.3529C1109.33 94.4348 1220.27 99.6812 1331.2 99.9435C1442.13 100.075 1553.07 95.3529 1608.53 92.8609L1664 90.5V181H1608.53C1553.07 181 1442.13 181 1331.2 181C1220.27 181 1109.33 181 998.4 181C887.467 181 776.533 181 665.6 181C554.667 181 443.733 181 332.8 181C221.867 181 110.933 181 55.4667 181H0L0 139.029Z"
              fill="#21A89A"
            />
          </svg>
          <div className="about_container">
            <div className="about_container_content">
              <div className="about_container_content_bloc">
                <h2>A Propos de nous</h2>
                <Markdown>
                  Bienvenue sur **Portail GéoCode**, votre compagnon de
                  confiance pour une mobilité électrique pratique et sans souci.
                  Notre plateforme innovante a été conçue pour simplifier votre
                  expérience de recharge de véhicules électriques, vous
                  permettant de trouver rapidement et facilement les bornes de
                  recharge les plus proches, où que vous soyez.
                </Markdown>
              </div>
              <div className="about_container_content_bloc">
                <h3>Notre Mission</h3>
                <Markdown>
                  Chez GéoCode, notre mission est de faciliter la transition
                  vers une mobilité durable en mettant à votre disposition une
                  carte interactive de bornes de recharge. Nous croyons
                  fermement en un avenir où chaque conducteur électrique peut
                  accéder à des solutions de recharge efficaces, contribuant
                  ainsi à la préservation de notre planète.
                </Markdown>
              </div>
              <div className="about_container_content_bloc">
                <h3>Fonctionnalités Clés</h3>
                <Markdown>
                  \- **Localisation Intelligente :** Grâce à la technologie de
                  géolocalisation, [Nom du Site] identifie automatiquement votre
                  position pour vous fournir des informations précises sur les
                  bornes de recharge à proximité.
                </Markdown>
                <Markdown>
                  \- **Personnalisation du Profil :** Créez un profil
                  utilisateur pour des recommandations de recharge
                  personnalisées en fonction de vos préférences et de
                  l'autonomie de votre véhicule.
                </Markdown>
              </div>
              <div className="about_container_content_bloc">
                <h3>Engagez-vous pour un Avenir Durable</h3>
                <Markdown>
                  En choisissant GeoCode, vous participez activement à la
                  construction d'un avenir plus vert. Nous croyons en la
                  puissance des petites actions pour créer un impact
                  significatif, et votre choix de conduire un véhicule
                  électrique et d'utiliser notre service de localisation de
                  bornes de recharge contribue à rendre le monde plus durable.
                </Markdown>
                <Markdown>
                  Rejoignez-nous sur cette belle aventure vers une mobilité
                  électrique accessible et respectueuse de l'environnement.
                  Ensemble, faisons avancer le monde, une recharge à la fois.
                </Markdown>
              </div>
            </div>
          </div>
          <svg
            className="about_svg"
            viewBox="0 0 1664 170"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1664 181L1608.53 178.377C1553.07 175.754 1442.13 170.507 1331.2 159.752C1220.27 149.128 1109.33 132.865 998.4 124.208C887.467 115.42 776.533 114.109 665.6 122.372C554.667 130.766 443.733 148.604 332.8 149.915C221.867 151.227 110.933 136.012 55.4667 128.274L0 120.667V-6.19888e-06H55.4667C110.933 -6.19888e-06 221.867 -6.19888e-06 332.8 -6.19888e-06C443.733 -6.19888e-06 554.667 -6.19888e-06 665.6 -6.19888e-06C776.533 -6.19888e-06 887.467 -6.19888e-06 998.4 -6.19888e-06C1109.33 -6.19888e-06 1220.27 -6.19888e-06 1331.2 -6.19888e-06C1442.13 -6.19888e-06 1553.07 -6.19888e-06 1608.53 -6.19888e-06H1664V181Z"
              fill="#19776d"
            />
            <path
              d="M1664 181L1608.53 178.377C1553.07 175.754 1442.13 170.507 1331.2 159.752C1220.27 149.128 1109.33 132.865 998.4 124.208C887.467 115.42 776.533 114.109 665.6 122.372C554.667 130.766 443.733 148.604 332.8 149.915C221.867 151.227 110.933 136.012 55.4667 128.274L0 120.667V-6.19888e-06H55.4667C110.933 -6.19888e-06 221.867 -6.19888e-06 332.8 -6.19888e-06C443.733 -6.19888e-06 554.667 -6.19888e-06 665.6 -6.19888e-06C776.533 -6.19888e-06 887.467 -6.19888e-06 998.4 -6.19888e-06C1109.33 -6.19888e-06 1220.27 -6.19888e-06 1331.2 -6.19888e-06C1442.13 -6.19888e-06 1553.07 -6.19888e-06 1608.53 -6.19888e-06H1664V181Z"
              fill="#19776d"
            />
            <path
              d="M1664 41.971L1608.53 46.9551C1553.07 52.0703 1442.13 62.0384 1331.2 66.8913C1220.27 71.7442 1109.33 71.2195 998.4 74.4985C887.467 77.7775 776.533 84.8601 665.6 85.6471C554.667 86.5652 443.733 81.3188 332.8 81.0565C221.867 80.9253 110.933 85.6471 55.4667 88.1391L1.33514e-05 90.5V-3.09944e-06L55.4667 -3.09944e-06C110.933 -3.09944e-06 221.867 -3.09944e-06 332.8 -3.09944e-06C443.733 -3.09944e-06 554.667 -3.09944e-06 665.6 -3.09944e-06C776.533 -3.09944e-06 887.467 -3.09944e-06 998.4 -3.09944e-06C1109.33 -3.09944e-06 1220.27 -3.09944e-06 1331.2 -3.09944e-06C1442.13 -3.09944e-06 1553.07 -3.09944e-06 1608.53 -3.09944e-06L1664 -3.09944e-06V41.971Z"
              fill="#21A89A"
            />
          </svg>
        </div>

        <div className="stats">
          <h2>Bornes de recharges électriques en chiffres</h2>
          <div className="stats_container">
            {Statistics.map((stat) => (
              <div key={stat.id} className="stats_container_box">
                <div className="stats_container_box_content">
                  <p className="number">{stat.count}</p>
                  <p className="name">{stat.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="partners">
          <svg
            className="partners_svg"
            viewBox="0 0 1920 135"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0L64 2C128 4 256 8.00001 384 16.2C512 24.3 640 36.7 768 43.3C896 50 1024 51 1152 44.7C1280 38.3 1408 24.7 1536 23.7C1664 22.7 1792 34.3 1856 40.2L1920 46V138H1856C1792 138 1664 138 1536 138C1408 138 1280 138 1152 138C1024 138 896 138 768 138C640 138 512 138 384 138C256 138 128 138 64 138H0L0 0Z"
              fill="#21A89A"
            />
            <path
              d="M0 0L64 2C128 4 256 8.00001 384 16.2C512 24.3 640 36.7 768 43.3C896 50 1024 51 1152 44.7C1280 38.3 1408 24.7 1536 23.7C1664 22.7 1792 34.3 1856 40.2L1920 46V138H1856C1792 138 1664 138 1536 138C1408 138 1280 138 1152 138C1024 138 896 138 768 138C640 138 512 138 384 138C256 138 128 138 64 138H0L0 0Z"
              fill="#21A89A"
            />
            <path
              d="M0 106L64 102.2C128 98.3 256 90.7 384 87C512 83.3 640 83.7 768 81.2C896 78.7 1024 73.3 1152 72.7C1280 72 1408 76 1536 76.2C1664 76.3 1792 72.7 1856 70.8L1920 69V138H1856C1792 138 1664 138 1536 138C1408 138 1280 138 1152 138C1024 138 896 138 768 138C640 138 512 138 384 138C256 138 128 138 64 138H0L0 106Z"
              fill="#21A89A"
            />
          </svg>

          <div className="partners_container">
            <h2 className="partners_container_title">
              Ils nous font confiance
            </h2>
            <div className="partners_container_content">
              {Partners.map((partner) => (
                <img
                  key={partner.id}
                  className="partner-logo"
                  src={partner.logo}
                  alt={partner.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
