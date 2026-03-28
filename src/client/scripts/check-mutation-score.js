#!/usr/bin/env node

/**
 * Script para verificar o score de mutação gerado pelo Stryker
 * Falha se o score estiver abaixo do threshold de 80%
 */

import fs from 'fs'
import path from 'path'

const THRESHOLD = 80
const REPORT_PATH = 'reports/mutation/json.json'

try {
  if (!fs.existsSync(REPORT_PATH)) {
    console.error(`❌ Relatório de mutação não encontrado em: ${REPORT_PATH}`)
    console.error('Execute "npm run test:mutation" primeiro')
    process.exit(1)
  }

  const report = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf-8'))
  
  // Calcula o score de mutação
  const metrics = report.metrics || report.thresholds || {}
  const mutationScore = metrics.mutationScore || metrics.score || 0

  console.log('\n📊 Relatório de Mutação:')
  console.log(`   Score: ${mutationScore.toFixed(2)}%`)
  console.log(`   Threshold: ${THRESHOLD}%`)
  console.log('')

  if (mutationScore >= THRESHOLD) {
    console.log(`✅ Score de mutação passou! (${mutationScore.toFixed(2)}% >= ${THRESHOLD}%)`)
    process.exit(0)
  } else {
    console.error(`❌ Score de mutação abaixo do threshold!`)
    console.error(`   ${mutationScore.toFixed(2)}% < ${THRESHOLD}%`)
    console.error('\n💡 Dicas:')
    console.error('   - Adicione mais testes unitários')
    console.error('   - Aumente a cobertura de testes')
    console.error('   - Abra reports/mutation/index.html para detalhes')
    process.exit(1)
  }
} catch (error) {
  console.error('❌ Erro ao verificar score de mutação:')
  console.error(error.message)
  process.exit(1)
}
