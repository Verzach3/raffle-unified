import { Button, Group, Input } from '@mantine/core';
import React, { useRef, useState } from 'react';
import { Dropzone } from '@mantine/dropzone';
function Settings() {
  async function getBackup() {
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = URL.createObjectURL(
      new Blob([JSON.stringify(window.db.getData())], { type: 'text/plain' })
    );

    // Asignamos el nombre "Hello" al archivo
    enlaceDescarga.download = 'Backup.bin';

    // Simulamos un clic en el enlace para descargar el archivo
    enlaceDescarga.click();
  }

  const openRef = useRef<() => void>(null);

  return (
    <div>
      <h1>Base de Datos</h1>
      <Dropzone
        openRef={openRef}
        onDrop={async (e) => {
          console.log(await e[0].text());
          window.db.setData(JSON.parse(await e[0].text()));
        }}
        activateOnClick={false}
        styles={{ inner: { pointerEvents: 'all' } }}
      >
        <Group position="center">
        <Button onClick={getBackup}>Guardar Copia</Button>
          <Button
            onClick={() => {
              openRef.current();
            }}
          >
            Cargar Copia
          </Button>
        </Group>
      </Dropzone>
    </div>
  );
}

export default Settings;
