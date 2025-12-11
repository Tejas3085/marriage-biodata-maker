export default function Head() {
  const title = "Create Marriage Biodata - Marriage Biodata Maker";
  const description =
    "Create a beautiful marriage biodata in minutes. Fill in personal details, choose a template and download a high-quality biodata PNG in English, Hindi, or Marathi.";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href="https://yourwebsite.com/Biodata-Form" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/templates/template1.jpg" />
      <meta property="og:url" content="https://yourwebsite.com/Biodata-Form" />

      {/* JSON-LD WebPage */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: title,
            description,
            url: "https://yourwebsite.com/Biodata-Form",
          }),
        }}
      />
    </>
  );
}
