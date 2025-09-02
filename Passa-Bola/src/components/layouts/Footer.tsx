export const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-heading font-bold text-lg">Passa a Bola</p>
          <p className="mt-2 text-sm text-gray-300">
            Tecnologia & Futebol Feminino
          </p>
          <p className="mt-4 text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Passa a Bola. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};