module.exports =
{
    bundle: {
        version: '0.1.0',
        id: 'com.boilerplate.panel',
        name: 'Boilerplate Panel',
        author_name: 'barooney',
        description: 'Boilerplate Panel.',
        ui_access: 'You can run this extension by choosing<br><b>Window &gt; Extensions &gt; Boilerplate Panel.</b>',
    },

    extensions: [{
        version: '0.1.0',
        id: 'com.boilerplate.panel.panel',
        name: 'Boilerplate Panel',
        main_path: 'index.html',
        script_path: 'extendscript/index.jsx',
        icons: {
            light: {
                normal: 'icons/icon-light.png',
                hover: 'icons/icon-light-hover.png',
                disabled: 'icons/icon-light-disabled.png'
            },
            dark: {
                normal: 'icons/icon-dark.png',
                hover: 'icons/icon-dark-hover.png',
                disabled: 'icons/icon-dark-disabled.png'
            },
        },
        manifest: 'bundle/manifest.extension.xml',
    }],

    builds: [
        // CC2017
        {
            bundle: { manifest: 'bundle/manifest.bundle.cc2017.xml' },
            products: ["indesign"],
            source: 'src',
            families: ['CC2017'],
        },
        // CC2015
        {
            bundle: { manifest: 'bundle/manifest.bundle.cc2015.xml' },
            products: ["indesign"],
            source: 'src',
            families: ['CC2015'],
        },
        // Adobe CC and CC2014
        {
            bundle: { manifest: 'bundle/manifest.bundle.cc.xml' },
            products: ["indesign"],
            source: 'src',
            families: ['CC2014', 'CC'],
        }
    ],
};
