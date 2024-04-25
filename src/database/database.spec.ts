import { Sequelize } from 'sequelize';
import { User } from '../users/user.entity';
import { BankAccount } from '../banks/bank-account/bank-account.entity'; 
import { config } from 'dotenv';

config();

const databaseName = process.env.DATABASE_NAME;
const databaseUser = process.env.DATABASE_USER;
const databasePassword = process.env.DATABASE_PASSWORD;
const databaseHost = process.env.DATABASE_HOST;


describe('Database Integration Test', () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    // Create a Sequelize instance and connect to the database
    sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
      host: databaseHost,
      dialect: 'mysql',
      logging: false,
    });

    // Sync the models with the database
    await User.sync({ force: true }); // Force sync to recreate the table
  });

  afterAll(async () => {
    // Close the Sequelize connection
    await sequelize.close();
  });

  it('should connect to the database', async () => {
    // Test database connection
    await sequelize.authenticate();
  });

  it('should create a user', async () => {
    // Create a new user
    const user = await User.create({
        email: 'testuser@example.com',
        password: 'testuser'
    });

    // Verify that the user was created successfully
    expect(user.email).toBe('testuser@example.com');
  });

  it('should create a user', async () => {
    // Create a new user
    const bankAccount = await BankAccount.create({
        account_num: 'testuser'
    });

    // Verify that the user was created successfully
    expect(bankAccount.account_num).toBeDefined();
    expect(bankAccount.balance).toBe('testuser');
  });
  it('should find users', async () => {
    // Find all users
    const bankAccounts = await BankAccount.findAll();

    // Verify that users were found
    expect(bankAccounts).toHaveLength(1);
  });

  it('should find users', async () => {
    // Find all users
    const users = await User.findAll();

    // Verify that users were found
    expect(users).toHaveLength(1);
  });

  // Add tests for the Bank model as needed
});
