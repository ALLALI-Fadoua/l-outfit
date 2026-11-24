/** Algerian mobile numbers: 05/06/07 + 8 digits (spaces allowed). */
export const isValidDzPhone = (v: string) => /^0[567]\d{8}$/.test(v.replace(/[\s.-]/g, ''))
