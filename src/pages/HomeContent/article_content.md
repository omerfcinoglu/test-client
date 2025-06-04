# Kavşaklardan Görüntü Toplanması
Farklı şehirlerdeki çeşitli kavşak tiplerinden insansız hava araçları (İHA) kullanılarak görüntü toplanması hedeflenmektedir. Bu süreçte amaç, farklı trafik olaylarının kayıt altına alınarak kaliteli modellerin geliştirilmesi için kapsamlı ve nitelikli bir veri seti oluşturmaktır. Bu kapsamda, Türkiye’nin 8 büyükşehri içerisinden uygun kavşaklar seçilerek görüntülerin toplanması planlanmaktadır.

# Taşıt ve Yaya Tespit Sisteminin Geliştirilmesi
Toplanan veri setinde yer alan kavşak kullanıcıları sınıflarına göre etiketleme işlemleri yapılacaktır. Etiketleme tamamlandıktan ve yeterli veri seti büyüklüğüne ulaşıldıktan sonra YOLO modelinin farklı versiyonları test edilerek performansları değerlendirilecektir. En yüksek performansı gösteren model seçilerek taşıt ve yaya tespit sistemi geliştirilecektir. Bu sistemde dikkate alınacak kavşak kullanıcı sınıfları şu şekildedir:

- **Yaya**
- **Bisiklet**
- **Scooter**
- **Motosiklet**
- **Otomobil**
- **Hafif Ticari Taşıt**
- **Otobüs**
- **Kamyon**
- **Treyler (TIR)**
- **Acil Durum Taşıtı**

# Yörünge ve Vekil Güvenlik Ölçütü (VGÖ) Belirleme Sisteminin Geliştirilmesi
Bu adımda, belirlenen kullanıcı sınıflarının kavşak içerisinde izlediği yörüngeler tespit edilecektir. Ardından, bu yörüngeler arasında oluşabilecek çatışmalar ve çatışan kullanıcı sınıfları belirlenecektir. Çatışma analizi, kavşak için risk değerlendirmesi yapabilmek amacıyla kullanılacak vekil güvenlik ölçütlerinin hesaplanmasını da içermektedir.

# Filtre Modelinin Geliştirilmesi
Filtre modeli, VGÖ analizi sonrasında risk taşıma potansiyeli olan vekil olaylar arasından hangilerinin risk değerlendirmesinde kullanılacağını belirlemek amacıyla tasarlanmış bir sınıflandırma sistemidir. Bu model sayesinde, risk değerlendirme işlemi yalnızca anlamlı olaylarla yapılacak ve daha isabetli sonuçlar elde edilecektir.

# Risk Sınıfının (RS) Belirlenmesi
Filtre modeli tarafından seçilen vekil olaylar, vekil güvenlik ölçütleri dikkate alınarak analiz edilecektir. Bu analizde, kullanıcı sınıflarının farklı kavşak tipleri ve hızlarına bağlı olarak risk sınıfları belirlenecektir.
