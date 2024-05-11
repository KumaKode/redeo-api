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
      "JobSeekerEducations",
      [
        {
          jobseekerId: 1,
          institute: "University of Michigan",
          start: "2010-01-01",
          end: "2014-01-01",
          degree: "Bachelor of Science",
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a pulvinar turpis. Nullam auctor massa faucibus, laoreet velit non, facilisis elit. Vivamus ipsum tellus, rhoncus et varius vitae, cursus sed ligula. Cras malesuada est lectus, sed ornare dui viverra et. Donec dapibus nibh a urna tincidunt, et euismod mi condimentum. Vestibulum ut nisi efficitur, iaculis risus non, ultrices velit. In sit amet vulputate nisi. Proin pharetra facilisis orci eu posuere. Pellentesque quis finibus orci. Vestibulum lorem libero, convallis ut eleifend nec, aliquet vel odio. In porta ipsum sit amet mi facilisis tincidunt. Nullam aliquet dui in orci dictum, at vulputate diam egestas. Praesent vitae suscipit odio, vel blandit purus.

          Donec porttitor, erat a vulputate suscipit, est magna venenatis diam, sed maximus lacus dolor eu mauris. Nullam porttitor viverra egestas. Mauris nec ornare mi, quis commodo sapien. Nunc mi neque, rhoncus vel tellus id, mollis imperdiet ante. Pellentesque fermentum sem purus, eget consequat elit vulputate sit amet. Fusce ut vulputate neque. In feugiat nisl ornare tortor euismod, in lobortis lorem tempor. Sed nisl nisi, accumsan quis consectetur blandit, vehicula eget est. Nunc purus nulla, ultricies et eros quis, bibendum dapibus urna. Curabitur hendrerit malesuada ex, ut luctus nibh fringilla in. Pellentesque et vestibulum sem.`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          jobseekerId: 1,
          institute: "College of Staten Island",
          start: "2010-01-01",
          end: "2014-01-01",
          degree: "Network Engineering",
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a pulvinar turpis. Nullam auctor massa faucibus, laoreet velit non, facilisis elit. Vivamus ipsum tellus, rhoncus et varius vitae, cursus sed ligula. Cras malesuada est lectus, sed ornare dui viverra et. Donec dapibus nibh a urna tincidunt, et euismod mi condimentum. Vestibulum ut nisi efficitur, iaculis risus non, ultrices velit. In sit amet vulputate nisi. Proin pharetra facilisis orci eu posuere. Pellentesque quis finibus orci. Vestibulum lorem libero, convallis ut eleifend nec, aliquet vel odio. In porta ipsum sit amet mi facilisis tincidunt. Nullam aliquet dui in orci dictum, at vulputate diam egestas. Praesent vitae suscipit odio, vel blandit purus.

          Donec porttitor, erat a vulputate suscipit, est magna venenatis diam, sed maximus lacus dolor eu mauris. Nullam porttitor viverra egestas. Mauris nec ornare mi, quis commodo sapien. Nunc mi neque, rhoncus vel tellus id, mollis imperdiet ante. Pellentesque fermentum sem purus, eget consequat elit vulputate sit amet. Fusce ut vulputate neque. In feugiat nisl ornare tortor euismod, in lobortis lorem tempor. Sed nisl nisi, accumsan quis consectetur blandit, vehicula eget est. Nunc purus nulla, ultricies et eros quis, bibendum dapibus urna. Curabitur hendrerit malesuada ex, ut luctus nibh fringilla in. Pellentesque et vestibulum sem.`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          jobseekerId: 2,
          institute: "University of Michigan",
          start: "2010-01-01",
          end: "2014-01-01",
          degree: "Bachelor of Science",
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a pulvinar turpis. Nullam auctor massa faucibus, laoreet velit non, facilisis elit. Vivamus ipsum tellus, rhoncus et varius vitae, cursus sed ligula. Cras malesuada est lectus, sed ornare dui viverra et. Donec dapibus nibh a urna tincidunt, et euismod mi condimentum. Vestibulum ut nisi efficitur, iaculis risus non, ultrices velit. In sit amet vulputate nisi. Proin pharetra facilisis orci eu posuere. Pellentesque quis finibus orci. Vestibulum lorem libero, convallis ut eleifend nec, aliquet vel odio. In porta ipsum sit amet mi facilisis tincidunt. Nullam aliquet dui in orci dictum, at vulputate diam egestas. Praesent vitae suscipit odio, vel blandit purus.

          Donec porttitor, erat a vulputate suscipit, est magna venenatis diam, sed maximus lacus dolor eu mauris. Nullam porttitor viverra egestas. Mauris nec ornare mi, quis commodo sapien. Nunc mi neque, rhoncus vel tellus id, mollis imperdiet ante. Pellentesque fermentum sem purus, eget consequat elit vulputate sit amet. Fusce ut vulputate neque. In feugiat nisl ornare tortor euismod, in lobortis lorem tempor. Sed nisl nisi, accumsan quis consectetur blandit, vehicula eget est. Nunc purus nulla, ultricies et eros quis, bibendum dapibus urna. Curabitur hendrerit malesuada ex, ut luctus nibh fringilla in. Pellentesque et vestibulum sem.`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          jobseekerId: 2,
          institute: "College of Staten Island",
          start: "2010-01-01",
          end: "2014-01-01",
          degree: "Network Engineering",
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a pulvinar turpis. Nullam auctor massa faucibus, laoreet velit non, facilisis elit. Vivamus ipsum tellus, rhoncus et varius vitae, cursus sed ligula. Cras malesuada est lectus, sed ornare dui viverra et. Donec dapibus nibh a urna tincidunt, et euismod mi condimentum. Vestibulum ut nisi efficitur, iaculis risus non, ultrices velit. In sit amet vulputate nisi. Proin pharetra facilisis orci eu posuere. Pellentesque quis finibus orci. Vestibulum lorem libero, convallis ut eleifend nec, aliquet vel odio. In porta ipsum sit amet mi facilisis tincidunt. Nullam aliquet dui in orci dictum, at vulputate diam egestas. Praesent vitae suscipit odio, vel blandit purus.

          Donec porttitor, erat a vulputate suscipit, est magna venenatis diam, sed maximus lacus dolor eu mauris. Nullam porttitor viverra egestas. Mauris nec ornare mi, quis commodo sapien. Nunc mi neque, rhoncus vel tellus id, mollis imperdiet ante. Pellentesque fermentum sem purus, eget consequat elit vulputate sit amet. Fusce ut vulputate neque. In feugiat nisl ornare tortor euismod, in lobortis lorem tempor. Sed nisl nisi, accumsan quis consectetur blandit, vehicula eget est. Nunc purus nulla, ultricies et eros quis, bibendum dapibus urna. Curabitur hendrerit malesuada ex, ut luctus nibh fringilla in. Pellentesque et vestibulum sem.`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          jobseekerId: 3,
          institute: "University of Michigan",
          start: "2010-01-01",
          end: "2014-01-01",
          degree: "Bachelor of Science",
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a pulvinar turpis. Nullam auctor massa faucibus, laoreet velit non, facilisis elit. Vivamus ipsum tellus, rhoncus et varius vitae, cursus sed ligula. Cras malesuada est lectus, sed ornare dui viverra et. Donec dapibus nibh a urna tincidunt, et euismod mi condimentum. Vestibulum ut nisi efficitur, iaculis risus non, ultrices velit. In sit amet vulputate nisi. Proin pharetra facilisis orci eu posuere. Pellentesque quis finibus orci. Vestibulum lorem libero, convallis ut eleifend nec, aliquet vel odio. In porta ipsum sit amet mi facilisis tincidunt. Nullam aliquet dui in orci dictum, at vulputate diam egestas. Praesent vitae suscipit odio, vel blandit purus.

          Donec porttitor, erat a vulputate suscipit, est magna venenatis diam, sed maximus lacus dolor eu mauris. Nullam porttitor viverra egestas. Mauris nec ornare mi, quis commodo sapien. Nunc mi neque, rhoncus vel tellus id, mollis imperdiet ante. Pellentesque fermentum sem purus, eget consequat elit vulputate sit amet. Fusce ut vulputate neque. In feugiat nisl ornare tortor euismod, in lobortis lorem tempor. Sed nisl nisi, accumsan quis consectetur blandit, vehicula eget est. Nunc purus nulla, ultricies et eros quis, bibendum dapibus urna. Curabitur hendrerit malesuada ex, ut luctus nibh fringilla in. Pellentesque et vestibulum sem.`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          jobseekerId: 3,
          institute: "College of Staten Island",
          start: "2010-01-01",
          end: "2014-01-01",
          degree: "Network Engineering",
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a pulvinar turpis. Nullam auctor massa faucibus, laoreet velit non, facilisis elit. Vivamus ipsum tellus, rhoncus et varius vitae, cursus sed ligula. Cras malesuada est lectus, sed ornare dui viverra et. Donec dapibus nibh a urna tincidunt, et euismod mi condimentum. Vestibulum ut nisi efficitur, iaculis risus non, ultrices velit. In sit amet vulputate nisi. Proin pharetra facilisis orci eu posuere. Pellentesque quis finibus orci. Vestibulum lorem libero, convallis ut eleifend nec, aliquet vel odio. In porta ipsum sit amet mi facilisis tincidunt. Nullam aliquet dui in orci dictum, at vulputate diam egestas. Praesent vitae suscipit odio, vel blandit purus.

          Donec porttitor, erat a vulputate suscipit, est magna venenatis diam, sed maximus lacus dolor eu mauris. Nullam porttitor viverra egestas. Mauris nec ornare mi, quis commodo sapien. Nunc mi neque, rhoncus vel tellus id, mollis imperdiet ante. Pellentesque fermentum sem purus, eget consequat elit vulputate sit amet. Fusce ut vulputate neque. In feugiat nisl ornare tortor euismod, in lobortis lorem tempor. Sed nisl nisi, accumsan quis consectetur blandit, vehicula eget est. Nunc purus nulla, ultricies et eros quis, bibendum dapibus urna. Curabitur hendrerit malesuada ex, ut luctus nibh fringilla in. Pellentesque et vestibulum sem.`,
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
    await queryInterface.bulkDelete("JobSeekerEducations", null, {});
  },
};
