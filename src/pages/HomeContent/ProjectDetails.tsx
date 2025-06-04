import React from "react";
import { Card, CardHeader, CardBody, Divider } from "@heroui/react";
import DefaultLayout from "@/layouts/default";
import ProjectFlow from "./ProjectFlow";

const ProjectDetails: React.FC = () => {
  //bild
  return (
 <DefaultLayout>
      <section className="flex items-center justify-center mt-4">
      <Card className="max-w-[1400px] w-full shadow-lg">
        <CardHeader className="flex gap-3 items-center justify-center">
          <div className="flex flex-col">
            <h4 className="text-3xl font-bold">Proje Detayları</h4>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sol taraftaki fotoğraf */}
            <div className="lg:w-4/12">
            <ProjectFlow/>
            </div>
            {/* Sağ taraftaki içerik */}
            <div className="lg:w-8/12 prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">Kavşaklardan Görüntü Toplanması</h2>
                <p className="dark:text-gray-300 text-black text-lg">
                  Farklı şehirlerdeki çeşitli kavşak tiplerinden insansız hava araçları (İHA) kullanılarak görüntü toplanması hedeflenmektedir. Bu süreçte amaç, farklı trafik olaylarının kayıt altına alınarak kaliteli modellerin geliştirilmesi için kapsamlı ve nitelikli bir veri seti oluşturmaktır. Bu kapsamda, Türkiye'nin 8 büyükşehri içerisinden uygun kavşaklar seçilerek görüntülerin toplanması planlanmaktadır.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Taşıt ve Yaya Tespit Sisteminin Geliştirilmesi</h2>
                  <p className="dark:text-gray-300 text-black mb-4 text-lg">
                  Toplanan veri setinde yer alan kavşak kullanıcıları sınıflarına göre etiketleme işlemleri yapılacaktır. Etiketleme tamamlandıktan ve yeterli veri seti büyüklüğüne ulaşıldıktan sonra YOLO modelinin farklı versiyonları test edilerek performansları değerlendirilecektir. En yüksek performansı gösteren model seçilerek taşıt ve yaya tespit sistemi geliştirilecektir.
                </p>
                <div className="pl-6">
                  <h3 className="text-lg font-semibold mb-2">Kavşak Kullanıcı Sınıfları:</h3>
                    <ul className="list-disc pl-6 text-black dark:text-gray-300 space-y-1">
                    <li>Yaya</li>
                    <li>Bisiklet</li>
                    <li>Scooter</li>
                    <li>Motosiklet</li>
                    <li>Otomobil</li>
                    <li>Hafif Ticari Taşıt</li>
                    <li>Otobüs</li>
                    <li>Kamyon</li>
                    <li>Treyler (TIR)</li>
                    <li>Acil Durum Taşıtı</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Yörünge ve Vekil Güvenlik Ölçütü (VGÖ) Belirleme Sisteminin Geliştirilmesi</h2>
                <p className="dark:text-gray-300 text-black text-lg ">
                  Bu adımda, belirlenen kullanıcı sınıflarının kavşak içerisinde izlediği yörüngeler tespit edilecektir. Ardından, bu yörüngeler arasında oluşabilecek çatışmalar ve çatışan kullanıcı sınıfları belirlenecektir. Çatışma analizi, kavşak için risk değerlendirmesi yapabilmek amacıyla kullanılacak vekil güvenlik ölçütlerinin hesaplanmasını da içermektedir.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Filtre Modelinin Geliştirilmesi</h2>
                <p className="dark:text-gray-300 text-black text-lg ">
                  Filtre modeli, VGÖ analizi sonrasında risk taşıma potansiyeli olan vekil olaylar arasından hangilerinin risk değerlendirmesinde kullanılacağını belirlemek amacıyla tasarlanmış bir sınıflandırma sistemidir. Bu model sayesinde, risk değerlendirme işlemi yalnızca anlamlı olaylarla yapılacak ve daha isabetli sonuçlar elde edilecektir.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Risk Sınıfının (RS) Belirlenmesi</h2>
                  <p className="dark:text-gray-300 text-black text-lg">
                  Filtre modeli tarafından seçilen vekil olaylar, vekil güvenlik ölçütleri dikkate alınarak analiz edilecektir. Bu analizde, kullanıcı sınıflarının farklı kavşak tipleri ve hızlarına bağlı olarak risk sınıfları belirlenecektir.
                </p>
              </section>
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
 </DefaultLayout>
  );
};

export default ProjectDetails;
