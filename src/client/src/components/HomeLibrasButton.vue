<script setup>
import { Hand } from 'lucide-vue-next'
import { onMounted } from 'vue'

let vlibrasLoaded = false

const handleClick = () => {
  // Procura pelo elemento principal do VLibras
  const vlibrasContainer = document.querySelector('[data-vlibras-root], .vlibras, #vlibras, .vbtn, [class*="vlibras"]')
  
  if (vlibrasContainer) {
    // Tenta clicar no botão dentro do container
    const btn = vlibrasContainer.querySelector('button, [role="button"]')
    if (btn) {
      btn.click()
      return
    }
    // Se não encontrar botão, tenta clicar no container mesmo
    vlibrasContainer.click()
    return
  }

  // Procura por iframes do VLibras
  const vlibrasIframe = document.querySelector('iframe[src*="vlibras"], iframe[class*="vlibras"]')
  if (vlibrasIframe) {
    vlibrasIframe.focus()
    return
  }

  // Tenta usar a API global se disponível
  if (window.vLirasScript !== undefined || window.vlibrasScript !== undefined) {
    console.log('VLibras encontrado na janela global')
    return
  }

  // Se nada funcionar, verifica no console
  console.warn('VLibras não encontrado. Procurando...')
  const allElements = document.querySelectorAll('[class*="libras"], [class*="vlibras"], [id*="vlibras"]')
  console.log('Elementos encontrados:', allElements)
}

onMounted(() => {
  // Carrega VLibras do governo quando o componente monta
  if (!vlibrasLoaded && typeof window !== 'undefined') {
    const existingScript = document.querySelector('script[src*="vlibras.gov.br"]')
    
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://vlibras.gov.br/app'
      script.async = true
      
      script.onload = () => {
        console.log('✅ VLibras carregado com sucesso')
        vlibrasLoaded = true
        
        // Aguarda um pouco para o VLibras se injetar
        setTimeout(() => {
          const vlibrasElement = document.querySelector('[class*="vlibras"], .vbtn, [data-vlibras]')
          if (vlibrasElement) {
            console.log('✅ Widget VLibras injetado na página')
          } else {
            console.warn('⚠️ Widget VLibras não foi encontrado após carregamento')
          }
        }, 2000)
      }
      
      script.onerror = () => {
        console.error('❌ Erro ao carregar VLibras')
        // Tenta carregar do CDN alternativo
        const altScript = document.createElement('script')
        altScript.src = 'https://www.vlibras.gov.br/app'
        altScript.async = true
        document.body.appendChild(altScript)
      }
      
      document.body.appendChild(script)
    } else {
      vlibrasLoaded = true
      console.log('VLibras já estava carregado')
    }
  }
})
</script>

<template>
  <button 
    @click="handleClick"
    class="libras-btn"
    title="Acessibilidade - Libras"
    aria-label="Acessibilidade - Tradução em Libras"
  >
    <Hand :size="24" color="white" stroke-width="2.5" />
  </button>
</template>

<style scoped>
.libras-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #001f4d;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 31, 77, 0.3);
}

.libras-btn:hover {
  background-color: #002d66;
  box-shadow: 0 6px 16px rgba(0, 31, 77, 0.4);
  transform: scale(1.1);
}

.libras-btn:active {
  transform: scale(0.95);
}

.libras-btn svg {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
