module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '13798246',
  database: 'topservice',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};
