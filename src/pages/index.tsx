import DefaultLayout from "@/layouts/default";
import Hero from "./HomeContent/Hero";
import { Divider } from "@heroui/react";
import HomePage_Texts from "@/constants/HomePageTexts";
import Members from "./HomeContent/Members";
export default function IndexPage() {
  return (
    <DefaultLayout>
      <Divider className="my-4" />
    
       <Hero
        title={HomePage_Texts.project_title}
        subtitle= {HomePage_Texts.project_coordinator}
        subtitle2= {HomePage_Texts.project_school}
      />

      <Members/>

    </DefaultLayout>
  );
}
