import { Sequelize } from 'sequelize';
import { User } from '../entity/user.entity';
import { Bank } from '../entity/bank.entity'; 

describe('Database Integration Test', () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    // Create a Sequelize instance and connect to the database
    sequelize = new Sequelize('test', 'root', '123456', {
      host: 'localhost',
      dialect: 'mysql',
      logging: false,
    });

    // Sync the models with the database
    await User.sync({ force: true }); // Force sync to recreate the table
    await Bank.sync({ force: true }); // Force sync to recreate the table
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
    expect(user.id).toBeDefined();
    expect(user.email).toBe('testuser@example.com');
    expect(user.password).toBe('testuser');
  });

  it('should create a user', async () => {
    // Create a new user
    const bank = await Bank.create({
        name: 'testuser'
    });

    // Verify that the user was created successfully
    expect(bank.id).toBeDefined();
    expect(bank.name).toBe('testuser');
  });
  it('should find users', async () => {
    // Find all users
    const banks = await Bank.findAll();

    // Verify that users were found
    expect(banks).toHaveLength(1);
  });

  it('should find users', async () => {
    // Find all users
    const users = await User.findAll();

    // Verify that users were found
    expect(users).toHaveLength(1);
  });

  // Add tests for the Bank model as needed
});
