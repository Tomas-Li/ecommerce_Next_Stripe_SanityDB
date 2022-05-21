import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: 's2o9sohs',
  dataset: 'production', //development or production
  apiVersion: '2022-03-10',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})

//We need this to use the sanity images
const builder = ImageUrlBuilder(client);

//Finally we need to recover our slugs:
export const urlFor= (source) => builder.image(source);