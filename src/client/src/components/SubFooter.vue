<script>
export default {
  name: "SubFooter"
};
</script>

<template>
  <footer class="sub-footer">
    <div class="sub-footer-container">
      <!-- Seção Esquerda: Logo e Contato -->
      <div class="footer-section footer-left">
        <div class="footer-logo">
          <span class="logo-text">Clinica Vitallis</span>
        </div>
        <div class="footer-contact">
          <p class="contact-item">
            <span class="contact-icon">☎️</span>
            <span class="contact-info">
              <span class="contact-label">Fale com a Dora</span>
              <span class="contact-number">(21) 2101-2658</span>
            </span>
          </p>
          <p class="contact-item">
            <span class="contact-icon">📞</span>
            <span class="contact-info">
              <span class="contact-label">Central</span>
              <span class="contact-number">3003-3230</span>
            </span>
          </p>
        </div>
        <!-- Social Media Icons -->
        <div class="social-media">
          <a href="#" class="social-icon" title="Facebook" aria-label="Facebook">f</a>
          <a href="#" class="social-icon" title="LinkedIn" aria-label="LinkedIn">in</a>
          <a href="#" class="social-icon" title="Instagram" aria-label="Instagram">📷</a>
          <a href="#" class="social-icon" title="X/Twitter" aria-label="X/Twitter">𝕏</a>
          <a href="#" class="social-icon" title="WhatsApp" aria-label="WhatsApp">💬</a>
          <a href="#" class="social-icon" title="YouTube" aria-label="YouTube">▶</a>
        </div>
      </div>

      <!-- Seção Centro: Links de Menu -->
      <div class="footer-section footer-center">
        <div class="footer-column">
          <h4 class="footer-title">HOME</h4>
          <ul class="footer-links">
            <li><a href="#">Para Pacientes</a></li>
            <li><a href="#">Especialidades</a></li>
            <li><a href="#">Exames e Procedimentos</a></li>
            <li><a href="#">Encontre uma Unidade</a></li>
            <li><a href="#">Encontre um Médico</a></li>
            <li><a href="#">Marcação de Consultas</a></li>
            <li><a href="#">Marcação de Exames</a></li>
            <li><a href="#">Resultado de Exames</a></li>
            <li><a href="#">Emergências</a></li>
            <li><a href="#">Planos e Convênios</a></li>
            <li><a href="#">Programas de Cuidado</a></li>
            <li><a href="#">Doenças</a></li>
            <li><a href="#">Vacinas</a></li>
            <li><a href="#">Transplantes</a></li>
            <li><a href="#">Patologia Molecular - Testes Genéticos</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h4 class="footer-title">Resultado de Exames</h4>
          <ul class="footer-links">
            <li><a href="#">Encontre um Médico</a></li>
            <li><a href="#">App da Cardiologia D'Or</a></li>
            <li><a href="#">Auto-agendamento Cirúrgico</a></li>
            <li><a href="#">Cursos e Palestras</a></li>
          </ul>

          <h4 class="footer-title" style="margin-top: 1.5rem;">Institucional</h4>
          <ul class="footer-links">
            <li><a href="#">Quem somos</a></li>
            <li><a href="#">Histórico</a></li>
            <li><a href="#">Nossas Políticas</a></li>
            <li><a href="#">Sustentabilidade</a></li>
            <li><a href="#">Integridade e Ética</a></li>
            <li><a href="#">Privacidade</a></li>
            <li><a href="#">Relações com o Investidor</a></li>
            <li><a href="#">Projetos Sociais</a></li>
            <li><a href="#">Segurança da Informação</a></li>
          </ul>
        </div>
      </div>

      <!-- Seção Direita: Outros Links e Parcerias -->
      <div class="footer-section footer-right">
        <div class="footer-column">
          <h4 class="footer-title">Especialidades</h4>
          <ul class="footer-links">
            <li><a href="#">Oncologia D'Or</a></li>
            <li><a href="#">Rede Star</a></li>
            <li><a href="#">IDOR</a></li>
            <li><a href="#">Cardiologia D'Or</a></li>
            <li><a href="#">Maternidade D'Or</a></li>
          </ul>

          <h4 class="footer-title" style="margin-top: 1.5rem;">Parcerias</h4>
          <ul class="footer-links">
            <li><a href="#">Conheça nossas Parcerias</a></li>
          </ul>

          <h4 class="footer-title" style="margin-top: 1.5rem;">Aplicativo Rede D'Or</h4>
          <ul class="footer-links">
            <li><a href="#">Contrais de Atendimento</a></li>
          </ul>

          <h4 class="footer-title" style="margin-top: 1.5rem;">Ouvidoria</h4>
          <p class="footer-link-text">Ouvidoria</p>

          <h4 class="footer-title" style="margin-top: 1.5rem;">Notícias</h4>
          <p class="footer-link-text">Notícias</p>

          <h4 class="footer-title" style="margin-top: 1.5rem;">Imprensa</h4>
          <p class="footer-link-text">Imprensa</p>

          <h4 class="footer-title" style="margin-top: 1.5rem;">Trabalhe Conosco</h4>
          <ul class="footer-links">
            <li><a href="#">Dora - Assistente Digital</a></li>
            <li><a href="#">Responsáveis técnicos</a></li>
            <li><a href="#">Tua Saúde</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.sub-footer {
  background-color: #001f4d;
  color: #e0e0e0;
  padding: 3rem 2rem;
  font-size: 0.9rem;
}

.sub-footer-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr 1.5fr;
  gap: 3rem;
}

/* Seção Esquerda */
.footer-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.footer-logo {
  margin-bottom: 0.5rem;
}

.logo-text {
  font-size: 1.3rem;
  font-weight: 700;
  color: #52a9ff;
  letter-spacing: 1px;
}

.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 0;
}

.contact-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-label {
  font-size: 0.8rem;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-number {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
}

/* Redes Sociais */
.social-media {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.social-icon:hover {
  background-color: #52a9ff;
  border-color: #52a9ff;
  transform: translateY(-3px);
}

/* Colunas de Links */
.footer-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.footer-center {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.footer-right {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3rem;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #52a9ff;
  padding-bottom: 0.5rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.footer-links li {
  margin: 0;
}

.footer-links a {
  color: #b0b0b0;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.85rem;
}

.footer-links a:hover {
  color: #52a9ff;
}

.footer-link-text {
  color: #b0b0b0;
  font-size: 0.85rem;
  margin: 0;
}

/* Responsividade */
@media (max-width: 1024px) {
  .sub-footer-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-center,
  .footer-right {
    grid-column: 1;
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .sub-footer {
    padding: 2rem 1rem;
  }

  .sub-footer-container {
    gap: 1.5rem;
  }

  .footer-center,
  .footer-right {
    grid-template-columns: 1fr;
  }

  .social-media {
    flex-wrap: wrap;
  }

  .social-icon {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
}
</style>
