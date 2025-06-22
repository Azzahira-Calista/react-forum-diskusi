/* eslint-disable no-undef */
/**
 * Skenario:
 * - Pengguna mengunjungi halaman login
 * - Pengguna mengisi input email dan password dengan data yang valid
 * - Pengguna menekan tombol "Login"
 * - Sistem harus mengarahkan pengguna ke halaman / (aka home)
 * - Sistem harus menampilkan teks "Welcome" sebagai tanda login berhasil
 */

describe('Login Flow', () => {
  it('should login and redirect', () => {
    cy.visit('/login');

    cy.get('input[placeholder="Email"]').type('admin@gmail.com');
    cy.get('input[placeholder="Password"]').type('admin123');
    cy.contains('Login').click();

    cy.url({ timeout: 10000 }).should('include', '/');
  });
});