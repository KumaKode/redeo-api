"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Employers",
      [
        {
          userId: 1,
          companyName: "Nike",
          phone: "+123456789",
          companyAddress: "XYZ, PQR street, ABC city, 1234",
          companyDescription: `Meet Alex, a seasoned software engineer with over 4 years of hands-on experience and a fervent passion for backend development, data engineering, and cloud/DevOps. Alex's journey in the realm of coding began with a curiosity that quickly evolved into a profound understanding of the intricacies of software architecture and development.
          
          With a solid foundation in programming languages like Python, Java, and C++, Alex has honed their skills in crafting robust and efficient backend systems. Their code is not just functional but reflects a deep appreciation for clean, maintainable, and scalable solutions. Alex's commitment to quality is evident in the elegant structures and well-thought-out algorithms they employ in their work.
          
          Data engineering is another realm where Alex excels. Transforming raw data into meaningful insights is not just a task for them; it's a creative process. They are adept at designing and implementing data pipelines, ensuring that information flows seamlessly through the system, ultimately empowering businesses with actionable intelligence.
          
          Cloud computing and DevOps are integral parts of Alex's skill set. Whether it's deploying applications on cloud platforms like AWS, Azure, or Google Cloud, or implementing CI/CD pipelines, Alex is at home in the cloud. The idea of automating processes, ensuring continuous integration and delivery, and optimizing infrastructure for performance and cost efficiency excites them.
          
          What sets Alex apart is not just technical prowess but an unyielding passion for staying at the forefront of technological advancements. They avidly follow industry trends, participate in open-source projects, and contribute to the developer community. This commitment to staying current ensures that Alex is always equipped with the latest tools and methodologies to tackle complex challenges in the ever-evolving landscape of software engineering.
          
          In collaborative settings, Alex shines as a team player. Their effective communication skills and willingness to share knowledge make them a valuable asset to any development team. Whether mentoring junior developers or collaborating with cross-functional teams, Alex fosters an environment of innovation and continuous improvement.
          
          In summary, Alex is not just a software engineer with 3+ years of experience; they are a passionate advocate for backend development, data engineering, and cloud/DevOps. With a blend of technical expertise, creativity, and a collaborative spirit, Alex is poised to make significant contributions in shaping the future of software engineering.`,
          countryId: 1,
          stateId: 1,
          cityId: 1,
          companyLogo: "",
          companyWebsite: "xyz.com",
          employees: "10-20",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          companyName: "Apple",
          phone: "+123456789",
          companyAddress: "XYZ, PQR street, ABC city, 1234",
          companyDescription: `Meet Alex, a seasoned software engineer with over 4 years of hands-on experience and a fervent passion for backend development, data engineering, and cloud/DevOps. Alex's journey in the realm of coding began with a curiosity that quickly evolved into a profound understanding of the intricacies of software architecture and development.
          
          With a solid foundation in programming languages like Python, Java, and C++, Alex has honed their skills in crafting robust and efficient backend systems. Their code is not just functional but reflects a deep appreciation for clean, maintainable, and scalable solutions. Alex's commitment to quality is evident in the elegant structures and well-thought-out algorithms they employ in their work.
          
          Data engineering is another realm where Alex excels. Transforming raw data into meaningful insights is not just a task for them; it's a creative process. They are adept at designing and implementing data pipelines, ensuring that information flows seamlessly through the system, ultimately empowering businesses with actionable intelligence.
          
          Cloud computing and DevOps are integral parts of Alex's skill set. Whether it's deploying applications on cloud platforms like AWS, Azure, or Google Cloud, or implementing CI/CD pipelines, Alex is at home in the cloud. The idea of automating processes, ensuring continuous integration and delivery, and optimizing infrastructure for performance and cost efficiency excites them.
          
          What sets Alex apart is not just technical prowess but an unyielding passion for staying at the forefront of technological advancements. They avidly follow industry trends, participate in open-source projects, and contribute to the developer community. This commitment to staying current ensures that Alex is always equipped with the latest tools and methodologies to tackle complex challenges in the ever-evolving landscape of software engineering.
          
          In collaborative settings, Alex shines as a team player. Their effective communication skills and willingness to share knowledge make them a valuable asset to any development team. Whether mentoring junior developers or collaborating with cross-functional teams, Alex fosters an environment of innovation and continuous improvement.
          
          In summary, Alex is not just a software engineer with 3+ years of experience; they are a passionate advocate for backend development, data engineering, and cloud/DevOps. With a blend of technical expertise, creativity, and a collaborative spirit, Alex is poised to make significant contributions in shaping the future of software engineering.`,
          countryId: 1,
          stateId: 1,
          cityId: 1,
          companyLogo: "",
          companyWebsite: "xyz.com",
          employees: "50-100",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          companyName: "Sigma",
          phone: "+123456789",
          companyAddress: "XYZ, PQR street, ABC city, 1234",
          companyDescription: `Meet Alex, a seasoned software engineer with over 4 years of hands-on experience and a fervent passion for backend development, data engineering, and cloud/DevOps. Alex's journey in the realm of coding began with a curiosity that quickly evolved into a profound understanding of the intricacies of software architecture and development.
          
          With a solid foundation in programming languages like Python, Java, and C++, Alex has honed their skills in crafting robust and efficient backend systems. Their code is not just functional but reflects a deep appreciation for clean, maintainable, and scalable solutions. Alex's commitment to quality is evident in the elegant structures and well-thought-out algorithms they employ in their work.
          
          Data engineering is another realm where Alex excels. Transforming raw data into meaningful insights is not just a task for them; it's a creative process. They are adept at designing and implementing data pipelines, ensuring that information flows seamlessly through the system, ultimately empowering businesses with actionable intelligence.
          
          Cloud computing and DevOps are integral parts of Alex's skill set. Whether it's deploying applications on cloud platforms like AWS, Azure, or Google Cloud, or implementing CI/CD pipelines, Alex is at home in the cloud. The idea of automating processes, ensuring continuous integration and delivery, and optimizing infrastructure for performance and cost efficiency excites them.
          
          What sets Alex apart is not just technical prowess but an unyielding passion for staying at the forefront of technological advancements. They avidly follow industry trends, participate in open-source projects, and contribute to the developer community. This commitment to staying current ensures that Alex is always equipped with the latest tools and methodologies to tackle complex challenges in the ever-evolving landscape of software engineering.
          
          In collaborative settings, Alex shines as a team player. Their effective communication skills and willingness to share knowledge make them a valuable asset to any development team. Whether mentoring junior developers or collaborating with cross-functional teams, Alex fosters an environment of innovation and continuous improvement.
          
          In summary, Alex is not just a software engineer with 3+ years of experience; they are a passionate advocate for backend development, data engineering, and cloud/DevOps. With a blend of technical expertise, creativity, and a collaborative spirit, Alex is poised to make significant contributions in shaping the future of software engineering.`,
          countryId: 1,
          stateId: 1,
          cityId: 1,
          companyLogo: "",
          companyWebsite: "xyz.com",
          employees: "100-150",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Employers", null, {});
  },
};
