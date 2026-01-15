export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Follow Us Section */}
        <div className="text-center mb-8 bg-gray-700 py-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Follow us on social media</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-center items-center">
            {/* Facebook */}
            <div className="flex flex-col items-center">
              <i className="fab fa-facebook-f text-3xl mb-2"></i>
              <p className="text-sm">Facebook</p>
            </div>
            {/* YouTube */}
            <div className="flex flex-col items-center">
              <i className="fab fa-youtube text-3xl mb-2"></i>
              <p className="text-sm">YouTube</p>
            </div>
            {/* Instagram */}
            <div className="flex flex-col items-center">
              <i className="fab fa-instagram text-3xl mb-2"></i>
              <p className="text-sm">Instagram</p>
            </div>
            {/* TikTok */}
            <div className="flex flex-col items-center">
              <i className="fab fa-tiktok text-3xl mb-2"></i>
              <p className="text-sm">TikTok</p>
            </div>
            {/* Pinterest */}
            <div className="flex flex-col items-center">
              <i className="fab fa-pinterest text-3xl mb-2"></i>
              <p className="text-sm">Pinterest</p>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="text-center text-sm text-gray-400 mt-8">
          <p>&copy; {new Date().getFullYear()} Car Trader. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}