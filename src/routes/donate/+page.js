const buttonText = "Support This Project";

const content = {
  props: {
    page: {
      title: "Support Us",
      intro: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Corrupti corporis quae unde cum, consectetur, voluptate placeat, aspernatur
        incidunt quaerat tempore molestiae. Reiciendis quod minima ex facilis
        molestiae quibusdam debitis aliquam.`
    },
    projects: {
      title: "Projects",
      intro: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Laborum eaque deserunt recusandae odio voluptatibus corporis hic nemo sint
        nesciunt facilis eum, vel consectetur similique qui ea ab consequuntur ad
        fugiat. Laborum eaque deserunt recusandae odio voluptatibus corporis hic nemo
        sint nesciunt facilis eum, vel consectetur similique qui ea ab consequuntur
        ad fugiat.`,
      content: [
        {
          image: "https://picsum.photos/640/400.webp?random=1",
          title: "Spyder",
          content:
            `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti
              corporis quae unde cum, consectetur, voluptate placeat, aspernatur
              incidunt quaerat tempore molestiae. Reiciendis quod minima ex facilis
              molestiae quibusdam debitis aliquam.`,
          buttonText,
        },
        {
          image: "https://picsum.photos/640/400.webp?random=2",
          title: "Project 2",
          content:
            `Corrupti corporis quae unde cum, consectetur, voluptate placeat,
              aspernatur incidunt quaerat tempore molestiae. Reiciendis quod minima
              ex facilis molestiae quibusdam debitis aliquam. Lorem ipsum dolor sit
              amet consectetur, adipisicing elit.`,
          buttonText,
        },
        {
          image: "https://picsum.photos/640/400.webp?random=3",
          title: "Project 3",
          content:
            `Reiciendis quod minima ex facilis molestiae quibusdam debitis aliquam.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti
              corporis quae unde cum, consectetur, voluptate placeat, aspernatur
              incidunt quaerat tempore molestiae.`,
          buttonText,
        },
        {
          image: "https://picsum.photos/640/400.webp?random=4",
          title: "Project 4",
          content:
            `Reiciendis quod minima ex facilis molestiae quibusdam debitis aliquam.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti
              corporis quae unde cum, consectetur, voluptate placeat, aspernatur
              incidunt quaerat tempore molestiae.`,
          buttonText,
        },
      ]
    },
  }
}

export function load() {
  return content;
}
