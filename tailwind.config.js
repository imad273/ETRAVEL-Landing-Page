module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#4468E2',
        primaryBg1: '#EBF0FE',
        footerBg: '#E1E8F8',
        mainText: '#151515',
        NavText: '#1C4961',
        secondText: '#7f7f7f'
      },
      zIndex: {
        '-10' : '-10'
      },
      fontFamily: {
        'main': 'Be Vietnam Pro, sans-serif'
      },
      boxShadow: {
        'mine': 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      }
    },
    container: {
      center: true
    }
  },
  plugins: [],
}
