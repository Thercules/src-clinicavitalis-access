# Estrutura de Componentes

## Organização

A estrutura de componentes foi refatorada para melhor organização e manutenção:

```
components/
├── Common/          - Componentes reutilizáveis em várias páginas
│   ├── Footer.vue
│   ├── LanguageSwitcher.vue
│   ├── Navbar.vue
│   ├── SubFooter.vue
│   └── SubNavbar.vue
├── Home/           - Componentes específicos da página Home
│   ├── ClinicImage.vue
│   ├── Contact.vue
│   ├── DoctorFilter.vue
│   ├── Image.vue
│   ├── News.vue
│   ├── ServiceInfo.vue
│   ├── Services.vue
│   └── SubText.vue
└── Layout/         - Componentes de layout (quando implementados)
```

## 📋 Componentes por Pasta

### Common/ (Reutilizáveis)

- **Navbar.vue** - Navegação principal
- **SubNavbar.vue** - Sub-navegação
- **Footer.vue** - Rodapé
- **SubFooter.vue** - Sub-rodapé
- **LanguageSwitcher.vue** - Seletor de idioma

Esses componentes podem ser importados e usados em qualquer página.

### Home/ (Específicos da Home)

- **ClinicImage.vue** - Imagem de clínica
- **Contact.vue** - Seção de contato com mapa
- **DoctorFilter.vue** - Filtro e busca de médicos
- **Image.vue** - Imagem de destaque
- **News.vue** - Carrossel de notícias
- **ServiceInfo.vue** - Informações de serviços
- **Services.vue** - Lista de serviços
- **SubText.vue** - Texto secundário

Esses componentes são específicos da página Home e estão organizados para fácil localização.

### Layout/ (Reservado)

Pasta reservada para componentes de layout (MainLayout, BlankLayout, etc) quando forem criados como componentes.

## 🔄 Importando Componentes

### Em App.vue (já atualizado)

```javascript
import Navbar from "./components/Common/Navbar.vue"
import ClinicImage from "./components/Home/ClinicImage.vue"
```

### Em outras páginas

```javascript
import Navbar from "@/components/Common/Navbar.vue"
import Contact from "@/components/Home/Contact.vue"
```

## ✨ Benefícios

- **Organização clara** - Componentes agrupados por propósito
- **Reutilização fácil** - Componentes de layout em pasta dedicada
- **Manutenção simples** - Fácil encontrar componentes específicos de uma página
- **Escalabilidade** - Fácil adicionar novas pastas para novas seções

## 🚀 Próximos Passos

Se novos componentes forem criados para outras páginas (About, Login, etc), siga o padrão:

```
components/
├── About/
│   ├── AboutHero.vue
│   └── AboutTeam.vue
├── Login/
│   ├── LoginForm.vue
│   └── RegisterForm.vue
```
