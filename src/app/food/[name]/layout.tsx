import { Metadata } from "next";

export function generateMetadata({
  params,
}: {
  params: { name: string };
}): Metadata {
  const title = `Découvrer ${params.name} - NutriNext`;
  const description = `Les valeurs nutritionnelles de ${params.name} sur NutriNext!`;
  return {
    title,
    description,
  };
}

export default function FoodLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
