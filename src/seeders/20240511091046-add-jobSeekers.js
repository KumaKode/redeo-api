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
      "JobSeekers",
      [
        {
          userId: 1,
          occupation: "Backend Developer",
          phone: "+123456789",
          description: `Meet Alex, a seasoned software engineer with over 4 years of hands-on experience and a fervent passion for backend development, data engineering, and cloud/DevOps. Alex's journey in the realm of coding began with a curiosity that quickly evolved into a profound understanding of the intricacies of software architecture and development.
          
          With a solid foundation in programming languages like Python, Java, and C++, Alex has honed their skills in crafting robust and efficient backend systems. Their code is not just functional but reflects a deep appreciation for clean, maintainable, and scalable solutions. Alex's commitment to quality is evident in the elegant structures and well-thought-out algorithms they employ in their work.
          
          Data engineering is another realm where Alex excels. Transforming raw data into meaningful insights is not just a task for them; it's a creative process. They are adept at designing and implementing data pipelines, ensuring that information flows seamlessly through the system, ultimately empowering businesses with actionable intelligence.
          
          Cloud computing and DevOps are integral parts of Alex's skill set. Whether it's deploying applications on cloud platforms like AWS, Azure, or Google Cloud, or implementing CI/CD pipelines, Alex is at home in the cloud. The idea of automating processes, ensuring continuous integration and delivery, and optimizing infrastructure for performance and cost efficiency excites them.
          
          What sets Alex apart is not just technical prowess but an unyielding passion for staying at the forefront of technological advancements. They avidly follow industry trends, participate in open-source projects, and contribute to the developer community. This commitment to staying current ensures that Alex is always equipped with the latest tools and methodologies to tackle complex challenges in the ever-evolving landscape of software engineering.
          
          In collaborative settings, Alex shines as a team player. Their effective communication skills and willingness to share knowledge make them a valuable asset to any development team. Whether mentoring junior developers or collaborating with cross-functional teams, Alex fosters an environment of innovation and continuous improvement.
          
          In summary, Alex is not just a software engineer with 3+ years of experience; they are a passionate advocate for backend development, data engineering, and cloud/DevOps. With a blend of technical expertise, creativity, and a collaborative spirit, Alex is poised to make significant contributions in shaping the future of software engineering.`,
          countryId: 1,
          stateId: 1,
          cityId: 1,
          totalExp: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          occupation: "Backend Developer",
          phone: "+123456789",
          description: `Meet Sam, a dynamic full stack developer with a rich background in both frontend and backend technologies. With over 3 years of hands-on experience, Sam has demonstrated a deep passion for creating innovative and user-friendly web applications.

          On the frontend, Sam is proficient in HTML, CSS, and JavaScript, with expertise in popular frameworks such as React, Angular, and Vue.js. Their focus is not just on building visually appealing interfaces but also on ensuring a seamless user experience. Sam pays meticulous attention to detail, ensuring that every pixel and interaction is finely tuned to delight users.
          
          In the backend realm, Sam is skilled in server-side languages like Node.js, Python, and Java. They have experience working with databases such as MySQL, MongoDB, and PostgreSQL, designing efficient schemas and writing optimized queries. Sam's backend solutions are not just robust but also scalable, capable of handling large volumes of data and traffic.
          
          What sets Sam apart is their ability to seamlessly integrate frontend and backend technologies to create cohesive web applications. Their understanding of RESTful APIs and microservices architecture allows them to design modular and maintainable systems. Sam's code is not just functional but also well-structured, making it easy for other developers to collaborate and contribute.
          
          In addition to frontend and backend development, Sam has a keen interest in cloud computing and DevOps practices. They are proficient in deploying applications on cloud platforms like AWS, Azure, and Google Cloud, and are experienced in setting up CI/CD pipelines for automated deployment.
          
          Sam's passion for learning and growth is evident in their continuous exploration of new technologies and best practices. They actively participate in hackathons, attend workshops, and contribute to open-source projects. This dedication to staying current ensures that Sam is always at the forefront of technological advancements in the rapidly evolving field of full stack development.
          
          As a team member, Sam is a valuable asset, known for their strong communication skills and collaborative approach. They thrive in fast-paced environments, where they can contribute their expertise to drive innovation and deliver high-quality solutions.
          
          In summary, Sam is not just a full stack developer with over 3 years of experience; they are a passionate technologist with a knack for bridging the gap between frontend and backend development. With a blend of technical expertise, creativity, and a collaborative spirit, Sam is poised to make significant contributions in the world of full stack development.`,
          countryId: 1,
          stateId: 1,
          cityId: 1,
          totalExp: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          occupation: "UI/UX Designer",
          phone: "+123456789",
          description: `Meet Maya, a talented UI/UX designer with a passion for creating stunning and intuitive user experiences. With her keen eye for detail and creative flair, Maya has been shaping digital experiences that delight users for over 2 years.

          Maya's journey in design began with a love for art and technology, which she seamlessly merged into her career. Her designs are not just visually appealing but also highly functional, reflecting a deep understanding of user psychology and interaction principles.
          
          On the UI front, Maya excels in creating clean, modern interfaces that captivate users from the first glance. She is proficient in design tools like Adobe XD, Sketch, and Figma, using them to craft pixel-perfect designs that breathe life into concepts and ideas.
          
          When it comes to UX, Maya is a problem solver at heart. She approaches each project with empathy, putting herself in the user's shoes to understand their needs and pain points. Her wireframes and prototypes are not just blueprints but thoughtful solutions that enhance usability and drive engagement.
          
          What sets Maya apart is her holistic approach to design. She doesn't just focus on the visual aspect but also considers the overall user journey and experience. Her designs are intuitive, guiding users seamlessly through interfaces and making complex tasks feel effortless.
          
          Beyond her technical skills, Maya is a great collaborator and communicator. She thrives in cross-functional teams, where she can brainstorm ideas, gather feedback, and iterate on designs to achieve the best results. Her positive attitude and willingness to learn make her a valuable asset to any design team.
          
          In addition to her professional work, Maya is passionate about giving back to the design community. She mentors aspiring designers, shares her knowledge through workshops and blogs, and actively participates in design forums and events.
          
          In summary, Maya is not just a UI/UX designer; she is a creative visionary who is dedicated to crafting exceptional digital experiences. With her blend of artistic talent, technical skills, and user-centric approach, Maya is paving the way for innovative and impactful design in the digital world.`,
          countryId: 1,
          stateId: 1,
          cityId: 1,
          totalExp: 2,
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
    await queryInterface.bulkDelete("JobSeekers", null, {});
  },
};
