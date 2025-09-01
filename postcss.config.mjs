const config = {
  plugins: ["@tailwindcss/postcss"],
  // tailwind.config.js
theme: {
  extend: {
    boxShadow: {
      glass: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    },
    backdropBlur: {
      glass: '20px',
    },
    backgroundImage: {
      shine: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
    },
  },
},

};


export default config;
