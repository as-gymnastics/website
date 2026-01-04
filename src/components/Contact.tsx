import React from 'react'

export const Contact: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">AS GYMNASTICS</h2>
              <p className="text-lg text-gray-600">
                Vino să ne cunoști și să descoperi lumea gimnasticii împreună cu noi
              </p>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
                  📍
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Adresă</h3>
                  <p className="text-gray-600">
                    Strada Serg. Alexandru Cutieru nr. 25A
                    <br />
                    București 061422
                    <br />
                    (Lângă Plaza Mall)
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    🚶‍♂️ Intrare și din Parcul Liniei
                    <br />
                    🅿️ Parcare disponibilă la Plaza Mall (5 min de mers pe jos)
                    <br />
                    🚇 Metrou Lujerului – 10 minute de mers pe jos
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
                  📞
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                  <a href="tel:+40756228870" className="text-gray-700 hover:underline">
                    +40 756 228 870
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
                  ✉️
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a
                    href="mailto:contact@as-gymnastics.ro"
                    className="text-gray-700 hover:underline"
                  >
                    contact@as-gymnastics.ro
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
                  🕐
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Program</h3>
                  <p className="text-gray-600">
                    Luni - Vineri: 16:00 - 20:00
                    <br />
                    Sâmbătă: 10:00 - 11:00 (Mini Gym)
                    <br />
                    Duminică: Închis
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-200 rounded-2xl overflow-hidden h-[400px] lg:h-full min-h-[400px] flex items-center justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.160072247051!2d26.034066576586707!3d44.42987860185233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b201ca16e48d17%3A0x8ff7d524118db1ba!2sStrada%20Serg.%20Alexandru%20Cutieru%2025A%2C%20Bucure%C8%99ti%20061422!5e0!3m2!1sen!2sro!4v1767551127906!5m2!1sen!2sro"
              width="600"
              height="560"
              style={{ border: '0' }}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
