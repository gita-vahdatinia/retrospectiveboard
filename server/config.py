import configparser
import os
import errno

ini_file = "./config.ini"
app_name = 'SYSTEM_TEST_DASHBOARD'

if not os.path.dirname(ini_file):
    raise OSError(errno.ENOENT, os.strerror(errno.ENOENT), ini_file)

config = configparser.ConfigParser()
config.read(ini_file)

# configurable data
PORT_NUMBER = config.get(app_name, 'port')
